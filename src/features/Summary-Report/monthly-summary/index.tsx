import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/report-tabs";
import { report } from "@/shared/lib/image-config";
import { IGAAndGC } from "@/interface/report-interface";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useRouter } from "next/router";
import { cn } from "@/shared/utils/utils";

interface IProps {
  tabValue: string;
  setTabValue: (value: string) => void;
  gaGcData: IGAAndGC | undefined;
  summaryLoading: boolean;
}
const MonthlySummary = ({
  tabValue,
  setTabValue,
  gaGcData,
  summaryLoading,
}: IProps) => {
  const router = useRouter();
  const summary = [
    {
      title: "GA Count",
      slug: "ga",
      value: gaGcData?.ga_count || 0,
      percentage: gaGcData?.ga_change_percent || 0,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
      icon: report?.gaCount,
    },
    {
      title: "GC Count",
      slug: "gc",
      value: gaGcData?.gc_count || 0,
      percentage: gaGcData?.gc_change_percent || 0,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
      icon: report?.gcCount,
    },
    {
      title: "Conversion Rate",
      slug: "",
      value: `${gaGcData?.conversion_rate || 0}%`,
      percentage: gaGcData?.conversion_rate_change_percent || 0,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
      icon: report?.conversionRate,
    },
    {
      title: "Opportunity Lost",
      slug: "",
      value: `${gaGcData?.opportunity_lost || 0}%`,
      percentage: gaGcData?.opportunity_lost_change_percent || 0,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
      icon: report?.opportunityLost,
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-medium">Monthly Summary</p>

        <div className="flex gap-4 items-center">
          <Tabs defaultValue={tabValue} onValueChange={setTabValue}>
            <TabsList>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {summary.map((item) => (
          <Card
            key={item.title}
            className={cn(item?.slug !== "" && "cursor-pointer")}
            onClick={() => {
              item?.slug !== "" &&
                router.push(
                  `/summary-report/${item.slug}?timeframe=${tabValue}`
                );
            }}
          >
            <CardContent className="!p-3">
              <div className="flex gap-2 items-center">
                <Image
                  src={item.icon}
                  width={45}
                  height={45}
                  alt={item.title}
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-color">
                    {item.title}
                  </p>
                  {summaryLoading ? (
                    <Skeleton className="w-10 h-5" />
                  ) : (
                    <p className="text-2xl font-bold leading-5 text-color">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 justify-end items-center mt-4">
                <Badge
                  variant={
                    item?.percentage < 0 ? "destructiveLight" : "success"
                  }
                >
                  {item?.percentage < 0 ? (
                    <ArrowDown size={14} />
                  ) : (
                    <ArrowUp size={14} />
                  )}
                  {Math.abs(item?.percentage)}%
                </Badge>
                <p className="text-sm text-gray-260">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>{" "}
    </>
  );
};

export default MonthlySummary;
