import { ArrowDown } from "lucide-react";
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

const MonthlySummary = () => {
  const monthlySummary = [
    {
      title: "GA Count",
      value: 60210,
      percentage: 26,
      label: "Vs Last Month",
      icon: report?.gaCount,
    },
    {
      title: "GC Count",
      value: 60210,
      percentage: 26,
      label: "Vs Last Month",
      icon: report?.gcCount,
    },
    {
      title: "Conversion Rate",
      value: 60210,
      percentage: 26,
      label: "Vs Last Month",
      icon: report?.conversionRate,
    },
    {
      title: "Opportunity Lost",
      value: 60210,
      percentage: 26,
      label: "Vs Last Month",
      icon: report?.opportunityLost,
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-medium">Monthly Summary</p>

        <div className="flex items-center gap-4">
          <Tabs defaultValue="monthly">
            <TabsList>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {monthlySummary.map((item) => (
          <Card key={item.title}>
            <CardContent className="!p-3">
              <div className="flex items-center gap-2">
                <Image
                  src={item.icon}
                  width={45}
                  height={45}
                  alt={item.title}
                />
                <div className="flex flex-col gap-2">
                  <p className="text-color text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="font-bold text-color text-2xl leading-5">
                    {item.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end mt-4">
                <Badge variant={"destructiveLight"}>
                  <ArrowDown size={14} />
                  {item.percentage}%
                </Badge>
                <p className="text-gray-260 text-sm">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>{" "}
    </>
  );
};

export default MonthlySummary;
