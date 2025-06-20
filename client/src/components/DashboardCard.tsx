import React from "react";
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export const DashboardCard = ({
  title,
  value,
  description,
  icon,
  trend,
}: DashboardCardProps) => {
  return (
    <Card className="group bg-white border rounded-3xl border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
            <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {value}
            </p>
            {description && (
              <p className="text-sm text-gray-500 mt-2">{description}</p>
            )}
            {trend && (
              <div
                className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  trend.positive
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-red-50 text-red-700 border-red-100"
                }`}
              >
                <span
                  className={
                    trend.positive ? "text-emerald-500" : "text-red-500"
                  }
                >
                  {trend.positive ? "↗" : "↘"}
                </span>
                {trend.positive ? "+" : ""}
                {trend.value}
              </div>
            )}
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-110 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-200">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};
