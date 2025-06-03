
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
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive ? "text-green-600" : "text-red-600"
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
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
