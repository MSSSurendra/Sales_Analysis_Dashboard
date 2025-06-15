
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  description: string;
}

export const KPICard = ({ title, value, change, trend, icon: Icon, description }: KPICardProps) => {
  const isPositive = trend === "up";
  
  return (
    <Card className="bg-transparent border-0 shadow-none hover:scale-105 transition-transform duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            isPositive ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {change}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};