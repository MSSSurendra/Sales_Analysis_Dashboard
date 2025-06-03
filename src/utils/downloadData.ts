import * as XLSX from 'xlsx';

// Sample data that matches what's displayed in the dashboard
export const salesDataset = {
  kpi: [
    {
      title: "Total Revenue",
      value: "$2,847,392",
      change: "+12.5%",
      trend: "up",
      description: "vs last month"
    },
    {
      title: "Total Orders",
      value: "18,247",
      change: "+8.2%",
      trend: "up", 
      description: "vs last month"
    },
    {
      title: "Avg Order Value",
      value: "$156.03",
      change: "+3.8%",
      trend: "up",
      description: "vs last month"
    },
    {
      title: "Active Customers",
      value: "12,847",
      change: "+15.3%",
      trend: "up",
      description: "vs last month"
    }
  ],
  salesOverview: {
    monthlyRevenue: [
      { month: "Jan", revenue: 425000, orders: 1420, avgOrder: 299 },
      { month: "Feb", revenue: 380000, orders: 1250, avgOrder: 304 },
      { month: "Mar", revenue: 520000, orders: 1680, avgOrder: 310 },
      { month: "Apr", revenue: 480000, orders: 1520, avgOrder: 316 },
      { month: "May", revenue: 620000, orders: 1890, avgOrder: 328 },
      { month: "Jun", revenue: 580000, orders: 1750, avgOrder: 331 }
    ],
    dailySales: [
      { day: "Mon", sales: 45000 },
      { day: "Tue", sales: 52000 },
      { day: "Wed", sales: 48000 },
      { day: "Thu", sales: 61000 },
      { day: "Fri", sales: 55000 },
      { day: "Sat", sales: 67000 },
      { day: "Sun", sales: 58000 }
    ]
  },
  revenue: [
    { date: "2024-01", revenue: 425000, target: 400000, orders: 1420 },
    { date: "2024-02", revenue: 380000, target: 420000, orders: 1250 },
    { date: "2024-03", revenue: 520000, target: 440000, orders: 1680 },
    { date: "2024-04", revenue: 480000, target: 460000, orders: 1520 },
    { date: "2024-05", revenue: 620000, target: 480000, orders: 1890 },
    { date: "2024-06", revenue: 580000, target: 500000, orders: 1750 },
    { date: "2024-07", revenue: 680000, target: 520000, orders: 2100 },
    { date: "2024-08", revenue: 720000, target: 540000, orders: 2250 },
    { date: "2024-09", revenue: 650000, target: 560000, orders: 2000 },
    { date: "2024-10", revenue: 780000, target: 580000, orders: 2400 },
    { date: "2024-11", revenue: 850000, target: 600000, orders: 2650 },
    { date: "2024-12", revenue: 920000, target: 620000, orders: 2850 }
  ],
  categories: [
    { name: "Electronics", value: 35, sales: 980000, color: "#3b82f6" },
    { name: "Clothing", value: 25, sales: 700000, color: "#06b6d4" },
    { name: "Home & Garden", value: 20, sales: 560000, color: "#8b5cf6" },
    { name: "Sports", value: 12, sales: 336000, color: "#10b981" },
    { name: "Books", value: 8, sales: 224000, color: "#f59e0b" }
  ],
  regions: [
    { region: "North America", sales: 1250000, growth: 15.2, customers: 4500 },
    { region: "Europe", sales: 980000, growth: 12.8, customers: 3800 },
    { region: "Asia Pacific", sales: 850000, growth: 22.5, customers: 5200 },
    { region: "Latin America", sales: 420000, growth: 18.7, customers: 2100 },
    { region: "Middle East", sales: 320000, growth: 25.3, customers: 1400 },
    { region: "Africa", sales: 180000, growth: 31.2, customers: 950 }
  ],
  topProducts: [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      sales: 185000,
      units: 850,
      growth: 15.3,
      rating: 4.8,
      trend: "up"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      category: "Electronics",
      sales: 142000,
      units: 720,
      growth: 22.1,
      rating: 4.6,
      trend: "up"
    },
    {
      id: 3,
      name: "Designer Coffee Table",
      category: "Home & Garden",
      sales: 128000,
      units: 320,
      growth: 8.7,
      rating: 4.9,
      trend: "up"
    },
    {
      id: 4,
      name: "Running Shoes - Pro Series",
      category: "Sports",
      sales: 95000,
      units: 580,
      growth: -3.2,
      rating: 4.4,
      trend: "down"
    },
    {
      id: 5,
      name: "Organic Cotton T-Shirt",
      category: "Clothing",
      sales: 78000,
      units: 1200,
      growth: 12.8,
      rating: 4.7,
      trend: "up"
    },
    {
      id: 6,
      name: "Professional Camera Lens",
      category: "Electronics",
      sales: 156000,
      units: 180,
      growth: 18.5,
      rating: 4.9,
      trend: "up"
    },
    {
      id: 7,
      name: "Leather Business Bag",
      category: "Clothing",
      sales: 89000,
      units: 240,
      growth: 6.4,
      rating: 4.5,
      trend: "up"
    },
    {
      id: 8,
      name: "Smart Home Speaker",
      category: "Electronics",
      sales: 112000,
      units: 650,
      growth: 25.7,
      rating: 4.3,
      trend: "up"
    }
  ]
};

export const downloadSalesData = () => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create worksheets for each data category
  
  // KPI Data
  const kpiWorksheet = XLSX.utils.json_to_sheet(salesDataset.kpi);
  XLSX.utils.book_append_sheet(workbook, kpiWorksheet, 'KPI Metrics');

  // Revenue Data
  const revenueWorksheet = XLSX.utils.json_to_sheet(salesDataset.revenue);
  XLSX.utils.book_append_sheet(workbook, revenueWorksheet, 'Revenue Analysis');

  // Sales Overview - Monthly Revenue
  const monthlyRevenueWorksheet = XLSX.utils.json_to_sheet(salesDataset.salesOverview.monthlyRevenue);
  XLSX.utils.book_append_sheet(workbook, monthlyRevenueWorksheet, 'Monthly Revenue');

  // Sales Overview - Daily Sales
  const dailySalesWorksheet = XLSX.utils.json_to_sheet(salesDataset.salesOverview.dailySales);
  XLSX.utils.book_append_sheet(workbook, dailySalesWorksheet, 'Daily Sales');

  // Categories Data
  const categoriesWorksheet = XLSX.utils.json_to_sheet(salesDataset.categories);
  XLSX.utils.book_append_sheet(workbook, categoriesWorksheet, 'Product Categories');

  // Regions Data
  const regionsWorksheet = XLSX.utils.json_to_sheet(salesDataset.regions);
  XLSX.utils.book_append_sheet(workbook, regionsWorksheet, 'Regional Sales');

  // Top Products Data
  const productsWorksheet = XLSX.utils.json_to_sheet(salesDataset.topProducts);
  XLSX.utils.book_append_sheet(workbook, productsWorksheet, 'Top Products');

  // Generate filename with current date
  const filename = `sales-data-${new Date().toISOString().split('T')[0]}.xlsx`;
  
  // Write and download the file
  XLSX.writeFile(workbook, filename);
};
