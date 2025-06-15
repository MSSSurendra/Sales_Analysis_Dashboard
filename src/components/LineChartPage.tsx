import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";

// Example data: monthly revenue and orders.
const data = [
  { month: "Jan", revenue: 425000, orders: 1420, expenses: 220000 },
  { month: "Feb", revenue: 380000, orders: 1250, expenses: 215000 },
  { month: "Mar", revenue: 520000, orders: 1680, expenses: 315000 },
  { month: "Apr", revenue: 480000, orders: 1520, expenses: 287000 },
  { month: "May", revenue: 620000, orders: 1890, expenses: 350000 },
  { month: "Jun", revenue: 580000, orders: 1750, expenses: 325000 },
];

export const LineChartPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-blue-400" />
          Revenue, Orders, Expenses
        </CardTitle>
        <CardDescription>
          Trend lines for revenue, number of orders, and expenses per month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
            <Tooltip
              formatter={(v: any, name: string) =>
                name === "orders" ? [`${v} orders`, "Orders"] : [`$${v.toLocaleString()}`, name === "revenue" ? "Revenue" : "Expenses"]
              }
              labelStyle={{ color: "#1e293b" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={false} name="Revenue"/>
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} name="Expenses"/>
            <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={true} name="Orders" yAxisId={1}/>
            <YAxis 
              orientation="right"
              yAxisId={1}
              stroke="#10b981"
              fontSize={12}
              tickFormatter={(v) => `${v}`}
              hide={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartPage;