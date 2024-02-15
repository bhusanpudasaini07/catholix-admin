import { Button } from "@/shared/components/ui/button";
import UsedRp from "../used-rp-chart/usedRp";
import { Progress } from "@/shared/components/ui/progress";
import {
  Activity,
  BadgeAlert,
  CalendarRange,
  Flag,
  Globe,
  Laptop,
  Link as Links,
  Projector,
  Star,
  Tag,
  Timer,
  TrendingDown,
  User,
  UserCircle2,
  Users,
  Zap,
} from "lucide-react";
import DataCardSkeleton from "@/shared/components/skeleton-loading/data-card-skeleton";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import {
  calculateDeadlinePercentValue,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { Badge } from "@/shared/components/ui/badge";
import moment from "moment";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Sheet, SheetContent, SheetHeader } from "@/shared/components/ui/sheet";
import { useRouter } from "next/router";
import useProjectSales from "@/hooks/project/detail/useProjectSales.hook";

const DetailOverview = () => {
  const router = useRouter();
  const {
    isLoading,
    gitModalOpen,
    setGitModalOpen,
    memberModalOpen,
    setMemberModalOpen,
    projectDetail,
    salesModalOpen,
    setSalesModalOpen,
    salesColumn,
    openLeadSheet,
    setOpenLeadSheet,
    staffDetails,
  } = useProjectDetail();

  const { salesRp, salesLoading } = useProjectSales();

  const { daysValue } = showDeadline(projectDetail?.data?.dates?.deadline!);

  const { value, totalDays } = calculateDeadlinePercentValue(
    projectDetail?.data?.dates?.start_date!,
    projectDetail?.data?.dates?.deadline!
  );
  const barValue = 100 - value;

  return (
    <div className="flex gap-6">
      {isLoading ? (
        <div className="grow max-w-[49%]">
          <div className="flex gap-4 mb-4">
            <DataCardSkeleton className="grow" />
            <DataCardSkeleton className="grow" />
          </div>
          <DataCardSkeleton className="w-full grow" />
        </div>
      ) : (
        <div className="grow">
          <div className="grid grid-cols-12 gap-3">
            {/* RP Used */}
            <div className="col-span-6 card">
              <div className="w-full">
                <div className="flex items-center justify-start mb-4 gap-7">
                  <p className="text-lg font-medium text-zinc-700">
                    Total RP Used
                  </p>{" "}
                  <Button
                    onClick={() => setSalesModalOpen(true)}
                    size={"sm"}
                    className=""
                    variant={"white"}
                  >
                    Sales RP
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-10 gap-7">
                  <div className="">
                    <h3 className="text-4xl font-semibold text-zinc-800">
                      {projectDetail?.data?.rp?.used_rp ?? 0}
                    </h3>
                    <p className="text-sm font-normal text-zinc-500">
                      out of {projectDetail?.data?.rp?.sales_rp ?? 0}
                    </p>
                  </div>
                  <div className=" min-w-[120px]">
                    <UsedRp rp={projectDetail?.data?.rp!} />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Duration */}
            <div className="flex flex-col items-start justify-between col-span-6 card">
              <h5 className="mb-3 text-lg font-medium text-zinc-700">
                Project Duration
              </h5>
              <div className="w-full mt-auto">
                <h4
                  className={`mb-1 font-medium text-zinc-800 ${
                    daysValue && daysValue < 0 ? "text-xl" : "text-4xl"
                  }`}
                >
                  {daysValue
                    ? daysValue < 0
                      ? "Deadline Exceeded"
                      : daysValue
                    : 0}
                </h4>
                {daysValue && daysValue > 0 && (
                  <p className="text-sm text-zinc-500">Days Remaining</p>
                )}

                <Progress
                  className={cn("h-2 my-2", {
                    "[&>div]:bg-red-500": barValue >= 90,
                    "[&>div]:bg-orange-500": barValue > 50 && barValue <= 90,
                    "[&>div]:bg-green-500": barValue < 50,
                    "[&>div]:bg-gray-500": barValue === 0,
                  })}
                  value={barValue}
                />
                <p className="text-sm font-normal text-zinc-500">
                  Total Estimation: {totalDays >= 0 ? totalDays : "N/A"} Days
                </p>
              </div>
            </div>
          </div>

          {/* Unit Allocation */}
          <div className="mt-4 card">
            <div className="flex items-center justify-start gap-3 mb-4">
              <h5 className="font-medium text-zinc-700">Units Allocation</h5>
              <Button
                variant={"white"}
                onClick={() =>
                  router?.push(`/projects/${router?.query?.code}/rp-estimation`)
                }
                size={"sm"}
              >
                View Estimation
              </Button>
            </div>
            <div className="flex justify-between gap-5 pr-20 mt-9">
              <div className="flex items-start justify-center gap-2">
                <div className="mt-2 text-blue-500">
                  <Flag size={24} />
                </div>
                <div className="ml-1">
                  <p className="text-3xl font-semibold text-blue-500">
                    {projectDetail?.data?.rp?.approved_rp}
                  </p>
                  <p className="text-sm text-blue-600">Planned Units</p>
                </div>
              </div>
              <div className="flex items-start justify-center gap-2">
                <div className="mt-2 text-orange-500">
                  <Activity size={24} />
                </div>
                <div className="ml-1">
                  <p className="text-3xl font-semibold text-orange-500">
                    {projectDetail?.data?.rp?.sales_rp ?? 0}
                  </p>
                  <p className="text-sm font-normal text-orange-600">
                    Sales Units
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-center gap-2">
                <div className="mt-2 text-red-500">
                  <TrendingDown size={24} />
                </div>
                <div className="ml-1">
                  <p className="text-3xl font-semibold text-red-500">
                    {projectDetail?.data?.rp?.used_rp ?? 0}
                  </p>
                  <p className="text-sm text-red-600">Spent Units</p>
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
          <div className="flex items-center justify-start gap-4 mb-7">
            <p className="text-lg font-medium text-zinc-700">Project Detail</p>
            <Button variant={"white"} size={"sm"}>
              More Details
            </Button>
          </div>
          <div className="flex items-stretch justify-between gap-7">
            <div className="w-[50%]">
              <div className="">
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                    <Tag className="me-2" size={16} /> Status
                  </p>
                  <div className="grow text-start">
                    <Badge
                      variant={"outline"}
                      className={`
                            ${
                              projectDetail?.data?.status === "In Progress" &&
                              " border-blue-500 text-blue-500 "
                            }
                            ${
                              projectDetail?.data?.status ===
                                "Client Support" &&
                              " border-orange-500  text-orange-500"
                            }
                            ${
                              projectDetail?.data?.status === "On Hold" &&
                              " border-red-500 text-red-500 "
                            }
                          ${
                            ["Closed", "Delivered"].includes(
                              projectDetail?.data?.status!
                            ) && " border-green-500 text-green-500 "
                          }
                          ${
                            projectDetail?.data?.status === "Not Started" &&
                            " border-zinc-500 text-zinc-500"
                          }
                          capitalize border rounded-md`}
                    >
                      {projectDetail?.data?.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                    <CalendarRange className="me-2" size={16} /> Period
                  </p>
                  <div className="text-sm font-medium grow text-start">
                    {`${moment(projectDetail?.data?.dates.start_date).format(
                      "MMM Do, YYYY"
                    )} - ${moment(projectDetail?.data?.dates.deadline).format(
                      "MMM Do, YYYY"
                    )}`}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                    <Zap className="me-2" size={16} /> Type
                  </p>
                  <div className="text-sm font-medium grow text-start">
                    {projectDetail?.data?.type}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                    <Globe className="me-2" size={16} />
                    Market
                  </p>
                  <div className="text-sm font-medium grow text-start">
                    {projectDetail?.data?.market_title}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                    <Star className="me-2" size={16} />
                    Source
                  </p>
                  <div className="text-sm font-medium grow text-start">
                    {projectDetail?.data?.source}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                    <Laptop className="me-2" size={16} /> Tech Stack
                  </p>
                  <div className="text-sm font-medium grow text-start">
                    {projectDetail?.data?.tech_stack}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                    <BadgeAlert size={16} className="me-2" />
                    Sales RP
                  </p>
                  <div className="text-sm font-medium grow text-start">
                    {projectDetail?.data?.rp?.sales_rp ?? 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <div className="">
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[160px] font-normal text-sm flex items-center">
                    <UserCircle2 className="me-2" size={16} />
                    Project Lead
                  </p>
                  <div className="text-sm font-medium grow text-start">
                    <p
                      className="underline cursor-pointer"
                      onClick={() => setOpenLeadSheet(true)}
                    >
                      {projectDetail?.data?.project_lead?.fullname}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[160px] font-normal text-sm flex items-center">
                    <Users size={16} className="me-2" /> Members & Role
                  </p>
                  <div className="grow text-start ">
                    <Button
                      onClick={() => setMemberModalOpen(true)}
                      variant={"outline_secondary"}
                      size={"sm"}
                    >
                      View Members
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6 gap-7">
                  <p className="text-zinc-500 w-[160px] font-normal text-sm flex items-center">
                    <Links size={16} className="me-2" /> Repo Link
                  </p>
                  <div className="grow text-start">
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => setGitModalOpen(true)}
                      disabled={projectDetail?.data?.git_urls?.length === 0}
                      className="text-green-500 border-green-500 hover:text-green-700 hover:border-green-700 hover:bg-transparent disabled:text-zinc-300 disabled:bg-light-white disabled:border-zinc-300"
                    >
                      git
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Git Modal */}
      <Dialog open={gitModalOpen} onOpenChange={setGitModalOpen}>
        <DialogContent className="p-6">
          <DialogHeader className="text-lg font-bold text-color">
            Git URLs
          </DialogHeader>
          <div className="flex flex-col min-w-0 gap-2">
            {projectDetail?.data?.git_urls?.map((url: string, index) => (
              <div
                key={index}
                className="flex items-start gap-4 mb-5 [&:last-child]:mb-0"
              >
                <p className="text-sm font-medium text-color min-w-[80px] text-end">
                  URL {index + 1} -
                </p>
                <Link
                  href={url}
                  target="_blank"
                  className="text-sm truncate transition text-primary"
                >
                  {url}
                </Link>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Member Modal */}
      <Dialog open={memberModalOpen} onOpenChange={setMemberModalOpen}>
        <DialogContent className="p-6 max-w-[550px]">
          <DialogHeader className="text-lg font-bold text-color">
            Roles and Members
          </DialogHeader>

          <div className="flex flex-col gap-3">
            {projectDetail?.data?.assigned_roles_members?.map((member) => (
              <div
                className="flex items-center justify-between gap-5"
                key={member?.role_user?.id}
              >
                <div className="flex items-center  w-[55%] text-base text-zinc-500">
                  <User size={20} className="me-2" />
                  <p>{member?.role_name}</p>
                </div>
                <Link
                  href={`/staff-details/${member?.role_user?.username}`}
                  className="text-start w-[40%] text-base hover:text-primary"
                >
                  {member?.role_user?.fullname}
                </Link>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Sales Modal */}
      <Dialog open={salesModalOpen} onOpenChange={setSalesModalOpen}>
        <DialogContent className="p-6">
          <DialogHeader className="text-lg font-bold text-color">
            Sales RP
          </DialogHeader>
          <DataTable
            border={true}
            data={salesRp?.data}
            loading={salesLoading}
            columns={salesColumn}
          />
        </DialogContent>
      </Dialog>

      {/* Project Lead sheet */}
      <Sheet open={openLeadSheet} onOpenChange={setOpenLeadSheet}>
        <SheetContent className="lg:max-w-[540px]">
          <SheetHeader className="text-xl font-medium text-zinc-700">
            Project lead Information
          </SheetHeader>

          <div className="flex flex-col gap-4 mt-14">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <User size={20} />
                Project Lead Name
              </div>
              <p className="text-sm font-semibold text-gray-700 ">
                {staffDetails?.data?.fullname}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Timer size={20} />
                Working Since
              </div>
              <p className="text-sm font-semibold text-gray-700 ">
                {moment(staffDetails?.data?.join_date).format("Do MMM, YYYY")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Projector size={20} />
                Projects Involved
              </div>
              <p className="text-sm font-semibold text-gray-700 ">
                {staffDetails?.data?.pl_projects?.length}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="pb-2 text-base font-semibold border-b border-b-gray-300 text-zinc-500">
              Project Involved Details
            </p>
            <div className="flex flex-col gap-4 mt-6 max-h-[calc(100vh-360px)] pr-4 overflow-y-auto">
              {staffDetails?.data?.pl_projects?.map((project) => (
                <div
                  className="flex items-center justify-between text-sm text-gray-700"
                  key={project?.id}
                >
                  <p className="font-semibold max-w-[70%]">{project?.title}</p>
                  <p>{project?.source}</p>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DetailOverview;
