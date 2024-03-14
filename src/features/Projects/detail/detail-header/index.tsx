import {
  BadgeAlert,
  Calendar,
  CalendarRange,
  ChevronLeft,
  Code2,
  FileCode2,
  Globe,
  Laptop,
  Link as Links,
  Pencil,
  Projector,
  Star,
  Timer,
  User,
  UserCircle2,
  Users,
  Zap,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import {
  IProjectDetail,
  ISalesRP,
  ISalesRPDetail,
} from "@/interface/project-interface";
import { IStaff } from "@/interface/staff-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader } from "@/shared/components/ui/sheet";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  projectDetail: IProjectDetail | undefined;
  loading: boolean;
  code: any;
  setGitModalOpen: (arg: boolean) => void;
  setOpenLeadSheet: (arg: boolean) => void;
  setMemberModalOpen: (arg: boolean) => void;
  staffDetails: IStaff | undefined;
  memberModalOpen: boolean;
  openLeadSheet: boolean;
  gitModalOpen: boolean;
}

const DetailHeader = ({
  projectDetail,
  loading,
  code,
  setGitModalOpen,
  setOpenLeadSheet,
  setMemberModalOpen,
  staffDetails,
  memberModalOpen,
  openLeadSheet,
  gitModalOpen,
}: IProps) => {
  const router = useRouter();
  return (
    <div className="flex items-start justify-between p-6 bg-white border-b border-b-slate-100">
      <div className="flex items-start gap-4">
        <Button
          onClick={() => router.push(`/projects`)}
          variant={"table"}
          className="h-auto gap-2 p-2.5"
          size={"sm"}
        >
          <ChevronLeft size={16} />
        </Button>
        <div className="">
          {loading ? (
            <Skeleton className="w-[80px] mb-2 h-5" />
          ) : (
            <div className="flex items-center gap-3">
              <h4 className="mb-1 text-2xl font-medium text-zinc-700">
                {projectDetail?.project_title}
              </h4>
              <Badge
                variant={"outline"}
                className={`
                            ${
                              projectDetail?.status === "In Progress" &&
                              " border-blue-500 text-blue-500 bg-blue-50"
                            }
                            ${
                              projectDetail?.status === "Client Support" &&
                              " border-orange-500  text-orange-500 bg-orange-50"
                            }
                            ${
                              projectDetail?.status === "On Hold" &&
                              " border-red-500 text-red-500 bg-red-50 "
                            }
                          ${
                            ["Closed", "Delivered"].includes(
                              projectDetail?.status!
                            ) && " border-green-500 text-green-500 bg-green-50 "
                          }
                          ${
                            projectDetail?.status === "Not Started" &&
                            " border-zinc-500 text-zinc-500 bg-zinc-50"
                          }
                          capitalize border rounded-md`}
              >
                {projectDetail?.status}
              </Badge>
            </div>
          )}
          <Accordion type="single" collapsible>
            <AccordionItem
              value="project-details"
              className="p-0 border-0 [&>h3]:w-fit"
            >
              <AccordionTrigger className="gap-1 p-0 text-base font-normal border-0 w-fit text-zinc-500">
                Project Overview
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap mt-8 gap-x-12 gap-y-5">
                  {/* Start */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <CalendarRange className="me-2" size={16} /> Start Date
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      {moment(projectDetail?.dates.start_date).format(
                        "Do MMM, YYYY"
                      )}
                    </div>
                  </div>
                  {/* End */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <CalendarRange className="me-2" size={16} /> End Date
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      {moment(projectDetail?.dates.deadline).format(
                        "Do MMM, YYYY"
                      )}
                    </div>
                  </div>
                  {/* Lead */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <UserCircle2 className="me-2" size={16} />
                      Project Lead
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      <p
                        className="underline cursor-pointer"
                        onClick={() => setOpenLeadSheet(true)}
                      >
                        {projectDetail?.project_lead?.fullname}
                      </p>
                    </div>
                  </div>
                  {/* Type */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <Zap className="me-2" size={16} /> Type
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      {projectDetail?.type}
                    </div>
                  </div>
                  {/* Market */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <Globe className="me-2" size={16} />
                      Market
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      {projectDetail?.market_title}
                    </div>
                  </div>
                  {/* Source */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <Star className="me-2" size={16} />
                      Source
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      {projectDetail?.source}
                    </div>
                  </div>
                  {/* Tech Stack */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <Laptop className="me-2" size={16} /> Tech Stack
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium break-all grow text-start">
                      {projectDetail?.tech_stack}
                    </div>
                  </div>
                  {/* Sales RP */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <BadgeAlert size={16} className="me-2" />
                      Sales RP
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      {projectDetail?.rp?.sales_rp ?? 0}
                    </div>
                  </div>
                  {/* Fiscal Year */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <Calendar size={16} className="me-2" />
                      Fiscal Year
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      {projectDetail?.fiscal_year}
                    </div>
                  </div>
                  {/* Code */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <FileCode2 size={16} className="me-2" />
                      Code
                    </p>
                    <div className="pl-6 mt-2 text-sm font-medium grow text-start">
                      {projectDetail?.code}
                    </div>
                  </div>
                  {/* Members */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <Users size={16} className="me-2" /> Members & Role
                    </p>
                    <div className="pl-6 mt-2">
                      <Button
                        onClick={() => setMemberModalOpen(true)}
                        variant={"outline_secondary"}
                        size={"sm"}
                      >
                        View Members
                      </Button>
                    </div>
                  </div>
                  {/* Repo */}
                  <div className="">
                    <p className="flex items-center text-sm font-normal text-zinc-500">
                      <Links size={16} className="me-2" /> Repo Link
                    </p>
                    <div className="pl-6 mt-2">
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => setGitModalOpen(true)}
                        disabled={projectDetail?.git_urls?.length === 0}
                        className="text-green-500 border-green-500 hover:text-green-700 hover:border-green-700 hover:bg-transparent disabled:text-zinc-300 disabled:bg-light-white disabled:border-zinc-300"
                      >
                        git
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <Button
          onClick={() => router.push(`/projects/${code}/edit`)}
          variant={"outline"}
          className="gap-2"
        >
          <Pencil size={16} />
          Edit
        </Button>
      </div>

      {/* Git Modal */}
      <Dialog open={gitModalOpen} onOpenChange={setGitModalOpen}>
        <DialogContent className="p-6">
          <DialogHeader className="text-lg font-bold text-color">
            Git URLs
          </DialogHeader>
          <div className="flex flex-col min-w-0 gap-2">
            {projectDetail?.git_urls?.map((url: string, index) => (
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
            {projectDetail?.assigned_roles_members?.map((member, index) => (
              <div
                className="flex items-center justify-between gap-5"
                key={index}
              >
                <div className="flex items-center  w-[55%] text-base text-zinc-500">
                  <User size={20} className="me-2" />
                  <p>{member?.role_name}</p>
                </div>
                <Link
                  href={`/staffs/${member?.role_user?.username}`}
                  className="text-start w-[40%] text-base hover:text-primary"
                >
                  {member?.role_user?.fullname}
                </Link>
              </div>
            ))}
          </div>
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

export default DetailHeader;
