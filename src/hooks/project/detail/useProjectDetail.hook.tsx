import {
  IConsumptionData,
  IProjectDetail,
  ISalesRP,
  ISalesRPDetail,
} from "@/interface/project-interface";
import { IStaff } from "@/interface/staff-interface";
import {
  getProjectDetail,
  getProjectSales,
  getRpSummary,
} from "@/services/project/project-service";
import { getStaffDetails } from "@/services/staff/staff-service";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

interface IProps {
  data: IProjectDetail;
}

export const useProjectDetail = () => {
  const router = useRouter();
  const { code } = router?.query;

  // STATES
  const [gitModalOpen, setGitModalOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [openLeadSheet, setOpenLeadSheet] = useState(false);

  const { data: projectDetail, isLoading } = useQuery<IProps>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectDetail(code);
        return response;
      }
    },
    queryKey: ["projectDetail", code],
  });

  // Staff Details
  const { data: staffDetails, isLoading: staffLoading } = useQuery<IStaff>({
    queryFn: async () => {
      if (projectDetail?.data?.project_lead?.username) {
        const response = await getStaffDetails(
          projectDetail?.data?.project_lead?.username
        );
        return response;
      }
    },
    queryKey: ["staffDetails", projectDetail],
  });

  const salesColumn: ColumnDef<ISalesRPDetail>[] = [
    {
      id: "added_on",
      accessorKey: "added_on",
      header: "Added On",
      cell: ({ row }) => (
        <div className="w-[100px]">
          <p>{moment(row.getValue("added_on")).format("Do, MMM YYYY")}</p>
          <p>{moment(row.getValue("added_on")).format("hh:mm")}</p>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP Unit",
      cell: ({ row }) => <div className="w-[50px]">{row.getValue("rp")}</div>,
      enableHiding: false,
    },
    {
      id: "remarks",
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("remarks")}</div>
      ),
      enableHiding: false,
    },
    {
      id: "added_by",
      accessorKey: "added_by",
      header: "By",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("added_by")}</div>
      ),
      enableHiding: false,
    },
  ];

  return {
    code,
    gitModalOpen,
    setGitModalOpen,
    memberModalOpen,
    setMemberModalOpen,
    salesModalOpen,
    setSalesModalOpen,
    openLeadSheet,
    setOpenLeadSheet,
    projectDetail,
    isLoading,
    salesColumn,
    staffDetails,
  };
};

export default useProjectDetail;
