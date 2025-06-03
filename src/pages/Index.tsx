import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Download, TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";
import { SalesOverview } from "@/components/SalesOverview";
import { RevenueChart } from "@/components/RevenueChart";
import { CategoryChart } from "@/components/CategoryChart";
import { RegionalChart } from "@/components/RegionalChart";
import { TopProducts } from "@/components/TopProducts";
import { KPICard } from "@/components/KPICard";

const Index = () => {
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$2,847,392",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Total Orders",
      value: "18,247",
      change: "+8.2%",
      trend: "up" as const,
      icon: ShoppingCart,
      description: "vs last month"
    },
    {
      title: "Avg Order Value",
      value: "$156.03",
      change: "+3.8%",
      trend: "up" as const,
      icon: TrendingUp,
      description: "vs last month"
    },
    {
      title: "Active Customers",
      value: "12,847",
      change: "+15.3%",
      trend: "up" as const,
      icon: Users,
      description: "vs last month"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Sales Analytics Dashboard</h1>
            <p className="text-slate-600 text-lg">Comprehensive insights into your sales performance</p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="30">
              <SelectTrigger className="w-[140px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SalesOverview />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <RevenueChart />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryChart />
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <RegionalChart />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <TopProducts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
