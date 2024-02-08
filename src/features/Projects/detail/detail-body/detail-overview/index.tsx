import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import UsedRp from "../used-rp-chart/usedRp";
import { Progress } from "@/shared/components/ui/progress";
import {
  BadgeAlert,
  CalendarRange,
  Flag,
  Globe,
  Laptop,
  Link,
  Star,
  Tag,
  UserCircle2,
  Users,
  Zap,
} from "lucide-react";
import DataCardSkeleton from "@/shared/components/skeleton-loading/data-card-skeleton";

const DetailOverview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fakeProjectData = {
    Status: "InProgress",
    Period: "2022-2023",
    Type: "Development",
    Market: "Global",
    Source: "Internal",
    TechStack: "React, Node.js",
    SalesRP: "5000",
    ProjectLead: "John Doe",
    MembersRole: "Developer, Designer",
    RepoLink: "https://github.com/your-repo",
  };
  return (
    <div className="flex gap-6">
      {isLoading ? (
        <div className="grow max-w-[49%]">
          <div className="flex gap-4 mb-4">
            <DataCardSkeleton className="grow" />
            <DataCardSkeleton className="grow" />
          </div>
          <DataCardSkeleton className="grow w-full" />
        </div>
      ) : (
        <div className="grow">
          <div className="flex w-full justify-between gap-3">
            <div className="card !p-4">
              <div className="flex">
                <div className="">
                  <div className="flex gap-7 items-center justify-start mb-4">
                    <p className="text-zinc-700 font-medium text-lg">
                      Total RP Used
                    </p>{" "}
                    <Button className="" variant={"white"}>
                      Sales RP
                    </Button>
                  </div>
                  <div className="flex gap-7 justify-start items-center">
                    <div className="">
                      <h3 className="text-zinc-800 text-4xl font-semibold">
                        55,232.23
                      </h3>
                      <p className="text-zinc-500  font-normal text-base">
                        out of 11,000.00
                      </p>
                    </div>
                  </div>
                </div>
                <div className="max-w-[150px] min-w-[150px]">
                  <UsedRp />
                </div>
              </div>
            </div>
            <div className="card grow !p-4 flex flex-col justify-between items-start">
              <h5 className="text-zinc-800 font-medium text-lg mb-3">
                Project Duration
              </h5>
              <div className="mt-auto w-full">
                <h4 className="text-zinc-800 font-medium text-4xl mb-3">45</h4>
                <p className="text-zinc-500  font-medium text-base">
                  Days Remaining
                </p>
                <Progress
                  className="!bg-secondary-500 !h-[8px] my-3"
                  value={33}
                />
                <p className="text-zinc-500  font-medium text-base">
                  Total Estimation: 105 Days
                </p>
              </div>
            </div>
          </div>
          <div className="card !p-4 mt-4">
            <div className="flex justify-start items-center gap-3 mb-4">
              <h5>Units Allocation</h5>
              <Button variant={"white"}>View Estimation</Button>
            </div>
            <div className="flex justify-between gap-5">
              <div className="flex gap-2 justify-center items-start">
                <div className="text-blue-500 mt-2">
                  <Flag size={20} />
                </div>
                <div className="">
                  <p className="text-blue-500 text-3xl font-semibold">
                    11,963.62
                  </p>
                  <p className="text-blue-500 text-sm font-semibold">
                    Planned Units
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-center items-start">
                <div className="text-blue-500 mt-2">
                  <Flag size={20} />
                </div>
                <div className="">
                  <p className="text-blue-500 text-3xl font-semibold">
                    11,963.62
                  </p>
                  <p className="text-blue-500 text-sm font-semibold">
                    Planned Units
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-center items-start">
                <div className="text-blue-500 mt-2">
                  <Flag size={20} />
                </div>
                <div className="">
                  <p className="text-blue-500 text-3xl font-semibold">
                    11,963.62
                  </p>
                  <p className="text-blue-500 text-sm font-semibold">
                    Planned Units
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <DataCardSkeleton className="grow max-w-[49%]" />
      ) : (
        <div className="card !p-4 grow max-w-[790px]">
          <div className="flex justify-start items-center gap-4 mb-7">
            <p className="font-medium text-lg text-zinc-700">Project Detail</p>
            <Button variant={"white"}>More Details</Button>
          </div>
          <div className="flex gap-7 justify-between items-stretch">
            <div className="w-[50%]">
              <div className="">
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[120px] font-normal text-base flex">
                    <Tag className="me-2" /> Status
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.Status ? fakeProjectData.Status : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[120px] font-normal text-base flex">
                    <CalendarRange className="me-2" /> Period
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.Period ? fakeProjectData.Period : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[120px] font-normal text-base flex">
                    <Zap className="me-2" /> Type
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.Type ? fakeProjectData.Type : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[120px] font-normal text-base flex">
                    <Globe className="me-2" />
                    Market
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.Market ? fakeProjectData.Market : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[120px] font-normal text-base flex">
                    <Star className="me-2" />
                    Source
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.Source ? fakeProjectData.Source : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[120px] font-normal text-base flex">
                    <Laptop className="me-2" /> Tech Stack
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.TechStack
                      ? fakeProjectData.TechStack
                      : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[120px] font-normal text-base flex">
                    <BadgeAlert className="me-2" />
                    Sales RP
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.SalesRP ? fakeProjectData.SalesRP : "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <div className="">
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[160px] font-normal text-base flex">
                    <UserCircle2 className="me-2" />
                    Project Lead
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.ProjectLead
                      ? fakeProjectData.ProjectLead
                      : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[160px] font-normal text-base flex">
                    <Users className="me-2" /> Members & Role
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.MembersRole
                      ? fakeProjectData.MembersRole
                      : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-7 items-center mb-4">
                  <p className="text-zinc-500 w-[160px] font-normal text-base flex">
                    <Link className="me-2" /> Repo Link
                  </p>
                  <div className="grow text-start">
                    {fakeProjectData.RepoLink
                      ? fakeProjectData.RepoLink
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailOverview;
