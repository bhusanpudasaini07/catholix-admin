import ReactEcharts, { EChartsOption } from "echarts-for-react";
import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";

interface ITabProps {
  title: string;
  id: number;
}

interface IProps {
  marketColumn: ColumnDef<any>[];
  tabItem: {
    title: string;
    id: number;
  };
  setTabItem: ({ title, id }: ITabProps) => void;
  individualMarketBarOption: EChartsOption;
  individualSankeyOption: EChartsOption;
}

const IndividualMarketCard = ({
  marketColumn,
  tabItem,
  setTabItem,
  individualMarketBarOption,
  individualSankeyOption,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <Tabs
          defaultValue={tabItem?.title}
          onValueChange={(e) =>
            setTabItem({
              title: e,
              id: 0,
            })
          }
        >
          <div className="flex items-center justify-start gap-3 mb-9">
            <p className="text-lg font-medium text-zinc-700">All</p>
            <TabsList className="grid grid-cols-2 ml-auto w-fit">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="sankey">Sankey Chart</TabsTrigger>
            </TabsList>
          </div>
          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
            <DataTable
              columns={marketColumn}
              data={[]}
              border
              lottieWidth={120}
            />

            <div className="h-full">
              <ReactEcharts
                option={
                  tabItem?.title === "sankey"
                    ? individualSankeyOption
                    : individualMarketBarOption
                }
                opts={{ renderer: "svg" }}
                style={{ height: 400 }}
              />
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IndividualMarketCard;
