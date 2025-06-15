import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Download, TrendingUp, DollarSign, ShoppingCart, Users, Mail, Github, Linkedin } from "lucide-react";
import { SalesOverview } from "@/components/SalesOverview";
import { RevenueChart } from "@/components/RevenueChart";
import { CategoryChart } from "@/components/CategoryChart";
import { RegionalChart } from "@/components/RegionalChart";
import { TopProducts } from "@/components/TopProducts";
import { KPICard } from "@/components/KPICard";
import { FileUpload } from "@/components/FileUpload";
import { downloadSalesData } from "@/utils/downloadData";
import { useSalesData } from "@/contexts/SalesDataContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LineChartPage } from "@/components/LineChartPage";
import { ScatterPlotChart } from "@/components/ScatterPlotChart";
import { DensityPlotChart } from "@/components/DensityPlotChart";

const Index = () => {
  const { salesData, isUsingUploadedData } = useSalesData();

  const handleExport = () => {
    downloadSalesData(salesData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 light:from-gray-50 light:via-gray-100 light:to-gray-200 light:text-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2 tracking-tight">Sales Analytics Dashboard</h1>
            <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg">
              {isUsingUploadedData 
                ? "Analytics generated from your uploaded data" 
                : "Comprehensive insights into your sales performance"}
            </p>
          </div>
          <div className="flex gap-3">
            <ThemeSwitcher />
            <Select defaultValue="30">
              <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300 light:text-gray-900">
                <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300">
                <SelectItem value="7" className="text-white hover:bg-gray-700 dark:text-white dark:hover:bg-gray-700 light:text-gray-900 light:hover:bg-gray-100">Last 7 days</SelectItem>
                <SelectItem value="30" className="text-white hover:bg-gray-700 dark:text-white dark:hover:bg-gray-700 light:text-gray-900 light:hover:bg-gray-100">Last 30 days</SelectItem>
                <SelectItem value="90" className="text-white hover:bg-gray-700 dark:text-white dark:hover:bg-gray-700 light:text-gray-900 light:hover:bg-gray-100">Last 90 days</SelectItem>
                <SelectItem value="365" className="text-white hover:bg-gray-700 dark:text-white dark:hover:bg-gray-700 light:text-gray-900 light:hover:bg-gray-100">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 border-blue-600 text-white transition-all duration-200" 
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <FileUpload />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {salesData.kpi.map((kpi: any, index: number) => (
            <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <KPICard {...kpi} />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-11 w-full max-w-7xl bg-gray-800 border border-gray-700">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="revenue" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all"
              >
                Revenue
              </TabsTrigger>
              <TabsTrigger 
                value="categories" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger 
                value="regions" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all"
              >
                Regions
              </TabsTrigger>
              <TabsTrigger 
                value="products" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all"
              >
                Products
              </TabsTrigger>
              
              <TabsTrigger 
                value="scatter" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all"
              >
                Relational Data
              </TabsTrigger>
              <TabsTrigger 
                value="linechart" 
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-all"
              >
                Line Trends
              </TabsTrigger>
              <TabsTrigger 
                value="density" 
                className="data-[state=active]:bg-green-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-all"
              >
                Density
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600 p-6">
                <SalesOverview />
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600 p-6">
                <RevenueChart />
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600 p-6">
                <CategoryChart />
              </div>
            </TabsContent>

            <TabsContent value="regions" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600 p-6">
                <RegionalChart />
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600 p-6">
                <TopProducts />
              </div>
            </TabsContent>

            <TabsContent value="scatter" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600 p-6">
                <ScatterPlotChart />
              </div>
            </TabsContent>
             <TabsContent value="linechart" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600 p-6">
                <LineChartPage />
              </div>
            </TabsContent>
            <TabsContent value="density" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600 p-6">
                <DensityPlotChart />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center">
            {/* Social links */}
            <div className="flex items-center gap-6 mb-2">
              <a
                href="https://www.linkedin.com/in/surendrameka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="https://github.com/MSSSurendra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="mailto:surendrachowdarymeka18@gmail.com"
                className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
                <span className="hidden sm:inline">Email</span>
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Made with ❤️ by <span className="font-semibold text-blue-400">M S S Surendra</span>
            </p>
            <p className="text-gray-400 text-xs mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
