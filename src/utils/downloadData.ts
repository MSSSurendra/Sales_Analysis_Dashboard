import * as XLSX from 'xlsx';
import { DollarSign, TrendingUp, ShoppingCart, Users } from 'lucide-react';

export const salesDataset = {
  kpi: [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Orders",
      value: "8,450",
      change: "+8.2%",
      trend: "up" as const,
      icon: ShoppingCart,
      description: "vs last month"
    },
    {
      title: "Customers",
      value: "3,200",
      change: "+15.3%",
      trend: "up" as const,
      icon: Users,
      description: "vs last month"
    },
    {
      title: "Growth Rate",
      value: "18.5%",
      change: "+2.4%",
      trend: "up" as const,
      icon: TrendingUp,
      description: "vs last month"
    }
  ],
  revenue: [
    { date: "2024-01", revenue: 425000, target: 400000, orders: 1420 },
    { date: "2024-02", revenue: 380000, target: 420000, orders: 1250 },
    { date: "2024-03", revenue: 520000, target: 440000, orders: 1680 },
    { date: "2024-04", revenue: 480000, target: 460000, orders: 1520 },
    { date: "2024-05", revenue: 620000, target: 480000, orders: 1890 },
    { date: "2024-06", revenue: 580000, target: 500000, orders: 1750 }
  ],
  salesOverview: [
    { month: "Jan", revenue: 425000, orders: 1420, avgOrder: 299 },
    { month: "Feb", revenue: 380000, orders: 1250, avgOrder: 304 },
    { month: "Mar", revenue: 520000, orders: 1680, avgOrder: 310 },
    { month: "Apr", revenue: 480000, orders: 1520, avgOrder: 316 },
    { month: "May", revenue: 620000, orders: 1890, avgOrder: 328 },
    { month: "Jun", revenue: 580000, orders: 1750, avgOrder: 331 }
  ],
  categories: [
    { name: "Electronics", value: 35, sales: 980000, color: "#3b82f6" },
    { name: "Clothing", value: 25, sales: 700000, color: "#06b6d4" },
    { name: "Home & Garden", value: 20, sales: 560000, color: "#8b5cf6" },
    { name: "Sports", value: 12, sales: 336000, color: "#10b981" },
    { name: "Books", value: 8, sales: 224000, color: "#f59e0b" }
  ],
  regions: [
    { name: "North America", value: 45, sales: 1260000 },
    { name: "Europe", value: 30, sales: 840000 },
    { name: "Asia Pacific", value: 20, sales: 560000 },
    { name: "Others", value: 5, sales: 140000 }
  ],
  products: [
    { name: "iPhone 15", sales: 245000, growth: 12.5, category: "Electronics" },
    { name: "Nike Air Max", sales: 180000, growth: 8.3, category: "Sports" },
    { name: "Samsung TV", sales: 165000, growth: 15.2, category: "Electronics" },
    { name: "Adidas Shoes", sales: 142000, growth: 6.8, category: "Sports" },
    { name: "MacBook Pro", sales: 128000, growth: 22.1, category: "Electronics" }
  ]
};

export const downloadSalesData = (data: any) => {
  const wb = XLSX.utils.book_new();
  
  // Convert KPI data for Excel (removing icon function)
  const kpiForExcel = data.kpi.map(({ icon, ...rest }: any) => rest);
  
  const kpiWs = XLSX.utils.json_to_sheet(kpiForExcel);
  XLSX.utils.book_append_sheet(wb, kpiWs, "KPI");
  
  const revenueWs = XLSX.utils.json_to_sheet(data.revenue || []);
  XLSX.utils.book_append_sheet(wb, revenueWs, "Revenue");
  
  const salesWs = XLSX.utils.json_to_sheet(data.salesOverview || []);
  XLSX.utils.book_append_sheet(wb, salesWs, "Sales Overview");
  
  const categoriesWs = XLSX.utils.json_to_sheet(data.categories || []);
  XLSX.utils.book_append_sheet(wb, categoriesWs, "Categories");
  
  const regionsWs = XLSX.utils.json_to_sheet(data.regions || []);
  XLSX.utils.book_append_sheet(wb, regionsWs, "Regions");
  
  const productsWs = XLSX.utils.json_to_sheet(data.products || []);
  XLSX.utils.book_append_sheet(wb, productsWs, "Products");
  
  XLSX.writeFile(wb, "sales-analytics-report.xlsx");
};
