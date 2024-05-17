import ReactECharts from "echarts-for-react";
import { PieChart } from "lucide-react";
import React, { useState } from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/project-details-tab";
import { TabsContent } from "@/shared/components/ui/tabs";
import BurndownSvg from "@/shared/svg/burndown";

const ProjectDashboardSprintStatus = () => {
  const [tabValue, setTabValue] = useState("burndown");
  const tabOptions = [
    {
      value: "burndown",
      title: "Sprint Burndown",
      icon: <BurndownSvg size={18} />,
      buttonName: "Burndown",
    },
    {
      value: "status",
      title: "Status",
      icon: <PieChart size={18} />,
      buttonName: "Status",
    },
  ];
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="burndown" onValueChange={(e) => setTabValue(e)}>
          <TabsList>
            {tabOptions?.map((tab) => (
              <TabsTrigger key={tab?.value} value={tab?.value}>
                {tab?.icon}
                {tabValue === tab?.value && <span>{tab?.title}</span>}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="status">
            <ReactECharts
              option={{}}
              style={{ height: 200 }}
              opts={{ renderer: "svg" }}
            />
            {/* <ProjectDetailStatus
              option={statusOption}
              columns={statusColumn}
              statusData={projectTaskLabelData?.data?.find(
                (item) => item?.type === "Status"
              )}
              loading={projectTaskLabelLoading}
              chartRef={chartRef}
            /> */}
          </TabsContent>
          <TabsContent value="burndown">
            <ReactECharts
              option={{}}
              style={{ height: 200 }}
              opts={{ renderer: "svg" }}
            />
            {/* <ProjectDetailStatus
              option={statusOption}
              columns={statusColumn}
              statusData={projectTaskLabelData?.data?.find(
                (item) => item?.type === "Status"
              )}
              loading={projectTaskLabelLoading}
              chartRef={chartRef}
            /> */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectDashboardSprintStatus;
