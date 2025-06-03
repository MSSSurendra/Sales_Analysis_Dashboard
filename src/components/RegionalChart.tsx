
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const regionalData = [
  { region: "North America", sales: 1250000, growth: 15.2, customers: 4500 },
  { region: "Europe", sales: 980000, growth: 12.8, customers: 3800 },
  { region: "Asia Pacific", sales: 850000, growth: 22.5, customers: 5200 },
  { region: "Latin America", sales: 420000, growth: 18.7, customers: 2100 },
  { region: "Middle East", sales: 320000, growth: 25.3, customers: 1400 },
  { region: "Africa", sales: 180000, growth: 31.2, customers: 950 },
];

const regionalTrend = [
  { month: "Jan", "North America": 95000, Europe: 78000, "Asia Pacific": 65000, "Latin America": 32000 },
  { month: "Feb", "North America": 88000, Europe: 72000, "Asia Pacific": 58000, "Latin America": 28000 },
  { month: "Mar", "North America": 102000, Europe: 85000, "Asia Pacific": 72000, "Latin America": 38000 },
  { month: "Apr", "North America": 98000, Europe: 82000, "Asia Pacific": 68000, "Latin America": 35000 },
  { month: "May", "North America": 115000, Europe: 95000, "Asia Pacific": 82000, "Latin America": 42000 },
  { month: "Jun", "North America": 112000, Europe: 92000, "Asia Pacific": 78000, "Latin America": 40000 },
];

export const RegionalChart = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Total sales performance across different regions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  stroke="#64748b" 
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <YAxis 
                  type="category" 
                  dataKey="region" 
                  stroke="#64748b" 
                  fontSize={12}
                  width={100}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Trends</CardTitle>
            <CardDescription>Monthly sales trends by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={regionalTrend}>
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
                <Line type="monotone" dataKey="North America" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Europe" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="Asia Pacific" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="Latin America" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regionalData.map((region, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{region.region}</h3>
                  <p className="text-2xl font-bold text-blue-600">${region.sales.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600 font-medium">+{region.growth}%</div>
                  <div className="text-xs text-slate-500">growth</div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Customers:</span>
                <span className="font-medium">{region.customers.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(region.sales / 1250000) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
