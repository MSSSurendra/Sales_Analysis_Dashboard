
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const categoryData = [
  { name: "Electronics", value: 35, sales: 980000, color: "#3b82f6" },
  { name: "Clothing", value: 25, sales: 700000, color: "#06b6d4" },
  { name: "Home & Garden", value: 20, sales: 560000, color: "#8b5cf6" },
  { name: "Sports", value: 12, sales: 336000, color: "#10b981" },
  { name: "Books", value: 8, sales: 224000, color: "#f59e0b" },
];

const monthlyCategory = [
  { month: "Jan", Electronics: 85000, Clothing: 65000, "Home & Garden": 45000, Sports: 30000, Books: 18000 },
  { month: "Feb", Electronics: 78000, Clothing: 58000, "Home & Garden": 42000, Sports: 28000, Books: 16000 },
  { month: "Mar", Electronics: 95000, Clothing: 72000, "Home & Garden": 52000, Sports: 35000, Books: 22000 },
  { month: "Apr", Electronics: 88000, Clothing: 68000, "Home & Garden": 48000, Sports: 32000, Books: 19000 },
  { month: "May", Electronics: 102000, Clothing: 78000, "Home & Garden": 58000, Sports: 38000, Books: 25000 },
  { month: "Jun", Electronics: 98000, Clothing: 75000, "Home & Garden": 55000, Sports: 36000, Books: 23000 },
];

export const CategoryChart = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}% ($${props.payload.sales.toLocaleString()})`,
                    'Share'
                  ]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Monthly trends by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="Electronics" stackId="a" fill="#3b82f6" />
                <Bar dataKey="Clothing" stackId="a" fill="#06b6d4" />
                <Bar dataKey="Home & Garden" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="Sports" stackId="a" fill="#10b981" />
                <Bar dataKey="Books" stackId="a" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {categoryData.map((category, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: category.color }}></div>
              <div className="font-semibold text-slate-900">{category.name}</div>
              <div className="text-sm text-slate-600">${category.sales.toLocaleString()}</div>
              <div className="text-xs text-slate-500">{category.value}% of total</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
