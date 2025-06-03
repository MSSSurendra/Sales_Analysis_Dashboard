
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
  { month: "Jan", revenue: 425000, orders: 1420, avgOrder: 299 },
  { month: "Feb", revenue: 380000, orders: 1250, avgOrder: 304 },
  { month: "Mar", revenue: 520000, orders: 1680, avgOrder: 310 },
  { month: "Apr", revenue: 480000, orders: 1520, avgOrder: 316 },
  { month: "May", revenue: 620000, orders: 1890, avgOrder: 328 },
  { month: "Jun", revenue: 580000, orders: 1750, avgOrder: 331 },
];

const dailySales = [
  { day: "Mon", sales: 45000 },
  { day: "Tue", sales: 52000 },
  { day: "Wed", sales: 48000 },
  { day: "Thu", sales: 61000 },
  { day: "Fri", sales: 55000 },
  { day: "Sat", sales: 67000 },
  { day: "Sun", sales: 58000 },
];

export const SalesOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue performance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                labelStyle={{ color: '#1e293b' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Sales</CardTitle>
          <CardDescription>Sales performance by day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                labelStyle={{ color: '#1e293b' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="#06b6d4"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
