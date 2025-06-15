import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";

// Fake density data (let's say, order amount density per order value bucket)
const densityData = [
  { orderValue: 50, density: 0.02 },
  { orderValue: 100, density: 0.06 },
  { orderValue: 150, density: 0.12 },
  { orderValue: 200, density: 0.19 },
  { orderValue: 250, density: 0.23 },
  { orderValue: 300, density: 0.18 },
  { orderValue: 350, density: 0.10 },
  { orderValue: 400, density: 0.06 },
  { orderValue: 450, density: 0.03 },
  { orderValue: 500, density: 0.014 },
];

export const DensityPlotChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-green-400" />
          Order Value Distribution
        </CardTitle>
        <CardDescription>
          Approximated density of orders by order value (simulated).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={densityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="orderValue" stroke="#64748b" fontSize={12} label={{ value: "Order Value ($)", position: "insideBottom", offset: -5, fill: "#64748b" }}/>
            <YAxis stroke="#64748b" fontSize={12} label={{ value: "Density", angle: -90, offset: 12, position: "insideLeft", fill: "#64748b" }}/>
            <Tooltip
              formatter={(v: any) => [v, "Density"]}
              labelFormatter={(label) => `Order Value: $${label}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px"
              }}
            />
            <Area type="monotone" dataKey="density" stroke="#10b981" fill="#bbf7d0" strokeWidth={2} fillOpacity={0.85} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
};

export default DensityPlotChart;