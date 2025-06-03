
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Star } from "lucide-react";

const topProducts = [
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
];

const getCategoryColor = (category: string) => {
  const colors = {
    "Electronics": "bg-blue-100 text-blue-800",
    "Clothing": "bg-purple-100 text-purple-800",
    "Home & Garden": "bg-green-100 text-green-800",
    "Sports": "bg-orange-100 text-orange-800"
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const TopProducts = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Best selling products by revenue and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{product.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className={getCategoryColor(product.category)}>
                        {product.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-slate-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-right">
                  <div>
                    <div className="font-semibold text-slate-900">${product.sales.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">{product.units} units</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {product.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      product.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {product.growth > 0 ? "+" : ""}{product.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">$1.2M</div>
            <div className="text-sm text-slate-600">Top 8 Products Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">4.6</div>
            <div className="text-sm text-slate-600">Average Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">4,740</div>
            <div className="text-sm text-slate-600">Total Units Sold</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">87.5%</div>
            <div className="text-sm text-slate-600">Positive Growth</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
