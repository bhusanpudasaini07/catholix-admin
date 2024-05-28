import React, { FC, useState } from "react";
import StaffUtilizationSankey from "./utilization-sankey";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { changeNumberFormat, hourTimeFormatter } from "@/shared/utils/rp-utils";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/router";

interface StaffUtilizationData {
  available_rp: number;
  available_time: number;
  client_rp: number;
  client_time: number;
  total_rp: number;
  total_time: number;
}

interface IProps {
  data: StaffUtilizationData;
}
const UtilizationSummary: FC<IProps> = ({ data }) => {
  const router = useRouter();
  const current_username = router.query?.username;
  const [tab, setTab] = useState<string>("budget");
  const loss_time = (data?.available_time - data?.total_time).toFixed(2);
  const loss_rp = (data?.available_rp - data?.total_rp).toFixed(2);
  const inhouse_rp = (data?.total_rp - data?.client_rp).toFixed(2);
  const inhouse_time = (data?.total_time - data?.client_time).toFixed(2);

  const lossRpPercentage = (
    (parseFloat(loss_rp) / data?.available_rp) *
    100
  ).toFixed(1);
  const lossTimePercentage = (
    (parseFloat(loss_time) / data?.available_time) *
    100
  ).toFixed(1);
  const spentRpPercentage = (
    (data?.total_rp / data?.available_rp) *
    100
  ).toFixed(1);
  const spentTimePercentage = (
    (data?.total_time / data?.available_time) *
    100
  ).toFixed(1);
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center justify-start mb-4 gap-7">
            <p className="text-lg font-medium text-zinc-700">
              Utilization Summary
            </p>
            <Button
              onClick={() =>
                router.push(`/staffs/${current_username}/staffs-trendline`)
              }
              variant={"white"}
              size={"sm"}
            >
              View Trendline
            </Button>
          </div>
          <Tabs defaultValue="budget" onValueChange={(value) => setTab(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="budget">Budget Utilization</TabsTrigger>
              <TabsTrigger value="time">Time Utilization</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="grid grid-cols-12 gap-1 ">
          <div className="col-span-12 md:col-span-7">
            <div className="flex flex-col flex-wrap gap-4 justify-start items-start">
              <div>
                <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#5470C6] before:me-2">
                  Available {tab === "budget" ? "Budget" : "Time"}
                </p>
                <div className="ms-[18px] flex items-center">
                  <p className="text-3xl font-medium text-zinc-700">
                    {tab === "budget"
                      ? changeNumberFormat(Math.round(data?.available_rp))
                      : hourTimeFormatter(data?.available_time)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-between items-start">
                <div>
                  <p className="flex justify-start mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#91CC75] before:me-2">
                    Spent {tab === "budget" ? "Budget" : "Time"}
                  </p>
                  <div className="ms-[18px] flex items-center whitespace-nowrap">
                    <p className="text-3xl font-medium text-zinc-700">
                      {tab === "budget"
                        ? changeNumberFormat(Math.round(Number(data?.total_rp)))
                        : hourTimeFormatter(data?.total_time)}
                    </p>
                    <p className="text-2xl font-medium text-zinc-500 ms-2">
                      |{" "}
                      {tab === "budget"
                        ? spentRpPercentage
                        : spentTimePercentage}
                      %
                    </p>
                  </div>
                </div>
                <div>
                  <p className="flex justify-start mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-blue-500 before:me-2">
                    Client Project {tab === "budget" ? "Budget" : "Time"}
                  </p>
                  <div className="ms-[18px] flex items-center">
                    <p className="text-3xl font-medium text-zinc-700">
                      {tab === "budget"
                        ? changeNumberFormat(
                            Math.round(Number(data?.client_rp))
                          )
                        : hourTimeFormatter(data?.client_time)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="flex justify-start mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-amber-500 before:me-2">
                    In-House Project {tab === "budget" ? "Budget" : "Time"}
                  </p>
                  <div className="ms-[18px] flex items-center">
                    <p className="text-3xl font-medium text-zinc-700">
                      {tab === "budget"
                        ? changeNumberFormat(Math.round(Number(inhouse_rp)))
                        : hourTimeFormatter(Number(inhouse_time))}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#EE6666] before:me-2">
                  Loss {tab === "budget" ? "Budget" : "Time"}
                </p>
                <div className="ms-[18px] flex items-center">
                  <p className="text-3xl font-medium text-zinc-700">
                    {tab === "budget"
                      ? changeNumberFormat(Math.round(Number(loss_rp)))
                      : hourTimeFormatter(Number(loss_time))}
                  </p>
                  <p className="text-2xl font-medium text-zinc-500 ms-2">
                    | {tab === "budget" ? lossRpPercentage : lossTimePercentage}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <StaffUtilizationSankey data={data} tab={tab} />
          </div>
        </div>
        {/* <StaffUtilizationSunburst data={data} tab={""} /> */}
      </CardContent>
    </Card>
  );
};

export default UtilizationSummary;
