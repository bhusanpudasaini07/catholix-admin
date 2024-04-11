import ReactEcharts, { EChartsOption } from "echarts-for-react";
import Image from "next/image";
import React, { useState } from "react";

import { IMarketProjects } from "@/interface/market-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";
import { Expand } from "lucide-react";
import { cn } from "@/shared/utils/utils";

interface IProps {
  marketColumn: ColumnDef<IMarketProjects>[];
  individualMarketBarOption: EChartsOption;
  individualSankeyOption: EChartsOption;
  tableData: any;
  marketTitle: string;
  marketFlag?: string;
}

const IndividualMarketCard = ({
  marketColumn,
  individualMarketBarOption,
  individualSankeyOption,
  tableData,
  marketTitle,
  marketFlag,
}: IProps) => {
  //   STATES
  const [tabItem, setTabItem] = useState({
    title: "sankey",
  });
  const [dataItem, setDataItem] = useState(8);
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <Card id={marketTitle}>
      <CardContent>
        <Tabs
          defaultValue={tabItem?.title}
          onValueChange={(e) =>
            setTabItem({
              title: e,
            })
          }
        >
          <div className="flex gap-3 justify-start items-center mb-9">
            <p className="flex gap-2 items-center text-lg font-medium text-zinc-700">
              {marketFlag && (
                <Image
                  width={16}
                  height={16}
                  src={marketFlag}
                  alt={`${marketTitle}-Flag`}
                />
              )}
              {marketTitle}
            </p>
            <TabsList className="grid grid-cols-2 ml-auto w-fit">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="sankey">Sankey Chart</TabsTrigger>
            </TabsList>

            <Button
              onClick={() => setExpand(!expand)}
              variant={"date_picker"}
              size={"sm"}
            >
              <Expand size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div
              className={cn(
                "col-span-12 order-1",
                !expand && " 2xl:col-span-6 order-0"
              )}
            >
              <DataTable
                columns={marketColumn}
                data={tableData?.slice(0, dataItem) ?? []}
                border
                lottieWidth={120}
                headerSticky
                height="max-h-[600px]"
              />
              {dataItem < tableData?.length && (
                <Button
                  variant={"ghost"}
                  onClick={() => setDataItem(dataItem + 10)}
                  className="w-full font-normal text-center cursor-pointer"
                >
                  Load More ({tableData?.length - dataItem}+)
                </Button>
              )}
            </div>

            <div
              className={cn(
                "col-span-12 h-full order-0",
                !expand && " 2xl:col-span-6 order-1"
              )}
            >
              <ReactEcharts
                option={
                  tabItem?.title === "sankey"
                    ? individualSankeyOption
                    : individualMarketBarOption
                }
                key={tabItem?.title}
                opts={{ renderer: "svg" }}
                style={{ height: !expand ? 400 : 800 }}
              />
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IndividualMarketCard;
