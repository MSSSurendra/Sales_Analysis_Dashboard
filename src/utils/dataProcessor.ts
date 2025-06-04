
import { DollarSign, TrendingUp, ShoppingCart, Users } from 'lucide-react';

export const processSalesData = async (file: File) => {
  const text = await file.text();
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  const data = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',');
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim();
      });
      return row;
    });

  // Calculate KPIs
  const totalRevenue = data.reduce((sum, row) => {
    const amount = parseFloat(row['sales amount'] || row['amount'] || row['revenue'] || '0');
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const totalOrders = data.length;
  const uniqueCustomers = new Set(data.map(row => row['customer'] || row['customer name'] || '')).size;

  // Generate processed data structure
  return {
    kpi: [
      {
        title: "Total Revenue",
        value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
        change: "+12.5%",
        trend: "up" as const,
        icon: DollarSign,
        description: "from uploaded data"
      },
      {
        title: "Orders",
        value: totalOrders.toLocaleString(),
        change: "+8.2%",
        trend: "up" as const,
        icon: ShoppingCart,
        description: "total transactions"
      },
      {
        title: "Customers",
        value: uniqueCustomers.toLocaleString(),
        change: "+15.3%",
        trend: "up" as const,
        icon: Users,
        description: "unique customers"
      },
      {
        title: "Avg Order",
        value: `$${(totalRevenue / totalOrders).toFixed(0)}`,
        change: "+2.4%",
        trend: "up" as const,
        icon: TrendingUp,
        description: "per transaction"
      }
    ],
    revenue: generateRevenueData(data),
    salesOverview: generateSalesOverview(data),
    categories: generateCategoryData(data),
    regions: generateRegionData(data),
    products: generateProductData(data)
  };
};

// Helper functions to generate chart data
const generateRevenueData = (data: any[]) => {
  const monthlyData: { [key: string]: number } = {};
  
  data.forEach(row => {
    const date = new Date(row['date'] || row['order date'] || Date.now());
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const amount = parseFloat(row['sales amount'] || row['amount'] || row['revenue'] || '0');
    
    if (!isNaN(amount)) {
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + amount;
    }
  });

  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([date, revenue]) => ({
      date,
      revenue,
      target: revenue * 0.9,
      orders: Math.floor(revenue / 300)
    }));
};

const generateSalesOverview = (data: any[]) => {
  const monthlyData = generateRevenueData(data);
  return monthlyData.map((item, index) => ({
    month: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
    revenue: item.revenue,
    orders: item.orders,
    avgOrder: Math.round(item.revenue / item.orders)
  }));
};

const generateCategoryData = (data: any[]) => {
  const categoryTotals: { [key: string]: number } = {};
  
  data.forEach(row => {
    const category = row['category'] || row['product category'] || 'Other';
    const amount = parseFloat(row['sales amount'] || row['amount'] || row['revenue'] || '0');
    
    if (!isNaN(amount)) {
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    }
  });

  const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
  const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'];
  
  return Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([name, sales], index) => ({
      name,
      value: Math.round((sales / total) * 100),
      sales,
      color: colors[index] || '#64748b'
    }));
};

const generateRegionData = (data: any[]) => {
  const regionTotals: { [key: string]: number } = {};
  
  data.forEach(row => {
    const region = row['region'] || row['country'] || row['state'] || 'Other';
    const amount = parseFloat(row['sales amount'] || row['amount'] || row['revenue'] || '0');
    
    if (!isNaN(amount)) {
      regionTotals[region] = (regionTotals[region] || 0) + amount;
    }
  });

  const total = Object.values(regionTotals).reduce((sum, val) => sum + val, 0);
  
  return Object.entries(regionTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4)
    .map(([name, sales]) => ({
      name,
      value: Math.round((sales / total) * 100),
      sales
    }));
};

const generateProductData = (data: any[]) => {
  const productTotals: { [key: string]: { sales: number, category: string } } = {};
  
  data.forEach(row => {
    const product = row['product'] || row['product name'] || row['item'];
    const category = row['category'] || row['product category'] || 'Other';
    const amount = parseFloat(row['sales amount'] || row['amount'] || row['revenue'] || '0');
    
    if (product && !isNaN(amount)) {
      if (!productTotals[product]) {
        productTotals[product] = { sales: 0, category };
      }
      productTotals[product].sales += amount;
    }
  });
  
  return Object.entries(productTotals)
    .sort(([,a], [,b]) => b.sales - a.sales)
    .slice(0, 5)
    .map(([name, data]) => ({
      name,
      sales: data.sales,
      growth: Math.random() * 20 + 5, // Random growth for demo
      category: data.category
    }));
};
