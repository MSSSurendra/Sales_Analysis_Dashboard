
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const revenueData = [
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
  { date: "2024-12", revenue: 920000, target: 620000, orders: 2850 },
];

export const RevenueChart = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Target</CardTitle>
          <CardDescription>Monthly revenue performance compared to targets</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `$${value.toLocaleString()}`, 
                  name === 'revenue' ? 'Revenue' : 'Target'
                ]}
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="target"
                stackId="1"
                stroke="#ef4444"
                fill="#fef2f2"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="2"
                stroke="#3b82f6"
                fill="#dbeafe"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">92.3%</div>
            <div className="text-sm text-slate-600">Target Achievement</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">$7.6M</div>
            <div className="text-sm text-slate-600">YTD Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">18.5%</div>
            <div className="text-sm text-slate-600">Growth Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
