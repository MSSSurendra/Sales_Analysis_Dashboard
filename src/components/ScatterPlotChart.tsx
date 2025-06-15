import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartScatter } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useSalesData } from "@/contexts/SalesDataContext";

/**
 * Extracts scatter plot data from salesOverview (orders vs. revenue per month)
 */
function getScatterData(salesOverview: any[]) {
  if (!Array.isArray(salesOverview)) return [];
  return salesOverview.map((item: any) => ({
    month: item.month,
    orders: item.orders,
    revenue: item.revenue,
  }));
}

export const ScatterPlotChart = () => {
  const { salesData } = useSalesData();
  const scatterData = getScatterData(salesData?.salesOverview ?? []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartScatter className="w-5 h-5 text-blue-400" />
          Orders vs. Revenue
        </CardTitle>
        <CardDescription>
          Explore relationships between number of orders and revenue per month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="orders"
              name="Orders"
              type="number"
              //label={{ value: "Orders", position: "bottom", offset: 0 }}
              label={{
                value: "Orders",
                position: "bottom",
                offset: 0,
                dy: 20, // add spacing below the axis label
                fill: "#64748b"
              }}
              tick={{ dy: 6 }}
              stroke="#64748b"
              axisLine={{ stroke: "#64748b" }}
              tickLine={{ stroke: "#64748b" }}
              interval="preserveStartEnd"
            />
            <YAxis
              dataKey="revenue"
              name="Revenue"
              type="number"
              //label={{ value: "Revenue ($)", angle: -90, position: "insideLeft" }}
               label={{
                value: "Revenue ($)",
                angle: -90,
                position: "insideLeft",
                dx: -25, // add spacing for y-axis label away from ticks
                fill: "#64748b"
              }}
              tick={{ dx: -4 }}
              stroke="#64748b"
              axisLine={{ stroke: "#64748b" }}
              tickLine={{ stroke: "#64748b" }}
              interval="preserveStartEnd"
            />
            <Tooltip
              formatter={(value: any, name: string) =>
                name === "orders"
                  ? [`${value} orders`, "Orders"]
                  : [`$${value?.toLocaleString()}`, "Revenue"]
              }
              labelStyle={{ color: "#1e293b" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px"
              }}
              cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "4 1" }}
            />
            <Legend />
            <Scatter
              name="Revenue per Month"
              data={scatterData}
              fill="#3b82f6"
              line
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ScatterPlotChart;