import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { ISSPData, ISSPDetail } from "@/interface/ssp-interface";
import { getSSPData } from "@/services/ssp/ssp-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

const useSSP = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [columns, setColumns] = useState<string>("");

  const { data: sspList, isLoading: sspListLoading } = useQuery<ISSPData>({
    queryKey: ["sspList", page, perPage, searchTrigger, columns],
    queryFn: async () => {
      if (columns) {
        const response = await getSSPData(page, perPage, searchText, columns);
        return response;
      }
    },
  });

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const applyColumns = (parsedColumns: string) => {
    setColumns(parsedColumns);
  };
  const resetHandler = () => {
    setSearchText("");
    setSearchTrigger(!searchTrigger);
  };
  const searchHandler = () => {
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  //   COLUMNS
  const sspColumns: ColumnDef<ISSPDetail>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      enableHiding: false,
      cell: ({ row }) => (
        <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
      ),
    },
    // Dealer Name
    {
      id: "dealer_name",
      accessorKey: "dealer_name",
      header: "Dealer Name",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="font-medium max-w-[250px]">
          {row.original.dealer_name || "-"}
        </p>
      ),
    },
    // Dealer Address
    {
      id: "dealer_address",
      accessorKey: "dealer_address",
      header: "Address",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="max-w-[200px]">{row.original.dealer_address || "-"}</p>
      ),
    },
    // Dealer Code
    {
      id: "dealer_code",
      accessorKey: "dealer_code",
      header: "Code",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.dealer_code || "-"}</p>,
    },
    // License Expire At
    {
      id: "license_expire",
      accessorKey: "license_expire",
      header: "License Expires At",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="inline-block px-2 py-1 text-sm font-medium text-yellow-700 bg-yellow-50 rounded">
          {"N/A"}
        </p>
      ),
    },
    // Trial
    {
      id: "trial",
      accessorKey: "trial",
      header: "Trial",
      enableHiding: false,
      cell: ({ row }) => <p>{"N/A"}</p>,
    },
    // Registration City
    {
      id: "registration_city",
      accessorKey: "registration_city",
      header: "Registration City",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.registration_city || "-"}</p>,
    },
    // Eligibility Privilege
    {
      id: "eligibility_privilege",
      accessorKey: "eligibility_privilege",
      header: "Eligibility Privilege",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="uppercase">{row.original.eligibility_privilege || "-"}</p>
      ),
    },
    // NIN Status
    {
      id: "nin_status",
      accessorKey: "nin_status",
      header: "NIN Status",
      enableHiding: true,
      cell: ({ row }) => (
        <Badge
          variant={"success"}
          className={cn("h-6 capitalize rounded border-0")}
        >
          {row.original.nin_status || "-"}
        </Badge>
      ),
    },
    // State of Origin
    {
      id: "state_of_origin_v",
      accessorKey: "state_of_origin_v",
      header: "State of Origin",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.state_of_origin_v || "-"}</p>,
    },
    // LGA of Origin
    {
      id: "lga_of_origin_v",
      accessorKey: "lga_of_origin_v",
      header: "LGA of Origin",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.lga_of_origin_v || "-"}</p>,
    },
    // Email
    {
      id: "email_v",
      accessorKey: "email_v",
      header: "Email",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.email_v || "-"}</p>,
    },
    // Agent Name from XML
    {
      id: "agent_name_v_from_xml",
      accessorKey: "agent_name_v_from_xml",
      header: "Agent Name (XML)",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.agent_name_v_from_xml || "-"}</p>,
    },
    // Alternate Mobile Number
    {
      id: "alter_mobile_num_v",
      accessorKey: "alter_mobile_num_v",
      header: "Alternate Mobile Number",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.alter_mobile_num_v || "-"}</p>,
    },
    // Religion
    {
      id: "religion_v",
      accessorKey: "religion_v",
      header: "Religion",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.religion_v || "-"}</p>,
    },
    // Registration State
    {
      id: "registration_state",
      accessorKey: "registration_state",
      header: "Registration State",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.registration_state || "-"}</p>,
    },
    // ID Issued By
    {
      id: "id_issued_by",
      accessorKey: "id_issued_by",
      header: "ID Issued By",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.id_issued_by || "-"}</p>,
    },
    // ID Type
    {
      id: "id_type",
      accessorKey: "id_type",
      header: "ID Type",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.id_type || "-"}</p>,
    },
    // ID Number
    {
      id: "id_number",
      accessorKey: "id_number",
      header: "ID Number",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.id_number || "-"}</p>,
    },
    // ID Expiry
    {
      id: "id_expiry",
      accessorKey: "id_expiry",
      header: "ID Expiry",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.id_expiry || "-"}</p>,
    },
    // Other Name
    {
      id: "other_name",
      accessorKey: "other_name",
      header: "Other Name",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.other_name || "-"}</p>,
    },
    // Primary MSISDN
    {
      id: "primary_msisdn_v",
      accessorKey: "primary_msisdn_v",
      header: "Primary MSISDN",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.primary_msisdn_v || "-"}</p>,
    },
    // Secondary SIM
    {
      id: "secondary_sim_v",
      accessorKey: "secondary_sim_v",
      header: "Secondary SIM",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.secondary_sim_v || "-"}</p>,
    },
    // Instance ID
    {
      id: "instance_id_n",
      accessorKey: "instance_id_n",
      header: "Instance ID",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.instance_id_n || "-"}</p>,
    },
    // Session Token
    {
      id: "session_token_v",
      accessorKey: "session_token_v",
      header: "Session Token",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.session_token_v || "-"}</p>,
    },
    // Action Code
    {
      id: "action_code_v",
      accessorKey: "action_code_v",
      header: "Action Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.action_code_v || "-"}</p>,
    },
    // Eyeball Status
    {
      id: "eyeball_status_v",
      accessorKey: "eyeball_status_v",
      header: "Eyeball Status",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.eyeball_status_v || "-"}</p>,
    },
    // Eyeball User
    {
      id: "eyeball_user_n",
      accessorKey: "eyeball_user_n",
      header: "Eyeball User",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.eyeball_user_n || "-"}</p>,
    },
    // Eyeball On
    {
      id: "eyeball_on_d",
      accessorKey: "eyeball_on_d",
      header: "Eyeball On",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.eyeball_on_d || "-"}</p>,
    },
    // Eyeball Remarks
    {
      id: "eyeball_remarks_v",
      accessorKey: "eyeball_remarks_v",
      header: "Eyeball Remarks",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.eyeball_remarks_v || "-"}</p>,
    },
    // Record Locked By
    {
      id: "record_locked_by_n",
      accessorKey: "record_locked_by_n",
      header: "Record Locked By",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.record_locked_by_n || "-"}</p>,
    },
    // Record Locked On
    {
      id: "record_locked_on_d",
      accessorKey: "record_locked_on_d",
      header: "Record Locked On",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.record_locked_on_d || "-"}</p>,
    },
    // Additional Attribute
    {
      id: "addnl_attrb_x",
      accessorKey: "addnl_attrb_x",
      header: "Additional Attribute",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.addnl_attrb_x || "-"}</p>,
    },
    // Eyeball Type
    {
      id: "eyeball_type_v",
      accessorKey: "eyeball_type_v",
      header: "Eyeball Type",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.eyeball_type_v || "-"}</p>,
    },
    // SIM Registration Kit Number
    {
      id: "simreg_kit_num_v",
      accessorKey: "simreg_kit_num_v",
      header: "SIM Registration Kit Number",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.simreg_kit_num_v || "-"}</p>,
    },
    // Agent Name from Table
    {
      id: "agent_name_v_from_table",
      accessorKey: "agent_name_v_from_table",
      header: "Agent Name (Table)",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.agent_name_v_from_table || "-"}</p>,
    },
    // Service Additional Field 1
    {
      id: "serv_addnl_fld_1_v",
      accessorKey: "serv_addnl_fld_1_v",
      header: "Service Additional Field 1",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.serv_addnl_fld_1_v || "-"}</p>,
    },
    // Service Additional Field 2
    {
      id: "serv_addnl_fld_2_v",
      accessorKey: "serv_addnl_fld_2_v",
      header: "Service Additional Field 2",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.serv_addnl_fld_2_v || "-"}</p>,
    },
    // Service Additional Field 3
    {
      id: "serv_addnl_fld_3_v",
      accessorKey: "serv_addnl_fld_3_v",
      header: "Service Additional Field 3",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.serv_addnl_fld_3_v || "-"}</p>,
    },
    // Service Additional Field 4
    {
      id: "serv_addnl_fld_4_v",
      accessorKey: "serv_addnl_fld_4_v",
      header: "Service Additional Field 4",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.serv_addnl_fld_4_v || "-"}</p>,
    },
    // Service Additional Field 5
    {
      id: "serv_addnl_fld_5_v",
      accessorKey: "serv_addnl_fld_5_v",
      header: "Service Additional Field 5",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.serv_addnl_fld_5_v || "-"}</p>,
    },
    // Is Posted to CLM
    {
      id: "is_posted_to_clm",
      accessorKey: "is_posted_to_clm",
      header: "Is Posted to CLM",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.is_posted_to_clm || "-"}</p>,
    },
    // Posted to CLM Date
    {
      id: "posted_to_clm_date",
      accessorKey: "posted_to_clm_date",
      header: "Posted to CLM Date",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.posted_to_clm_date || "-"}</p>,
    },
    // Request Received Date from CLM
    {
      id: "req_received_date_from_clm",
      accessorKey: "req_received_date_from_clm",
      header: "Request Received Date from CLM",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.req_received_date_from_clm || "-"}</p>
      ),
    },
    // Eyeball Details
    {
      id: "eyeball_details_v",
      accessorKey: "eyeball_details_v",
      header: "Eyeball Details",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.eyeball_details_v || "-"}</p>,
    },
    // Eyeball Recurring Image
    {
      id: "eyeball_recurringimg_v",
      accessorKey: "eyeball_recurringimg_v",
      header: "Eyeball Recurring Image",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.eyeball_recurringimg_v || "-"}</p>,
    },
    // Quarantine Flag
    {
      id: "quarantine_flag_v",
      accessorKey: "quarantine_flag_v",
      header: "Quarantine Flag",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.quarantine_flag_v || "-"}</p>,
    },
    // Quarantine Reason
    {
      id: "quarantine_reason_v",
      accessorKey: "quarantine_reason_v",
      header: "Quarantine Reason",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.quarantine_reason_v || "-"}</p>,
    },
    // Transaction Number
    {
      id: "transaction_num_n",
      accessorKey: "transaction_num_n",
      header: "Transaction Number",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.transaction_num_n || "-"}</p>,
    },
    // Registration Type
    {
      id: "reg_type_v",
      accessorKey: "reg_type_v",
      header: "Registration Type",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.reg_type_v || "-"}</p>,
    },
    // Department Code
    {
      id: "dept_code_v",
      accessorKey: "dept_code_v",
      header: "Department Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.dept_code_v || "-"}</p>,
    },
    // Fast Eyeball Date
    {
      id: "fast_eyeball_date_d",
      accessorKey: "fast_eyeball_date_d",
      header: "Fast Eyeball Date",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.fast_eyeball_date_d || "-"}</p>,
    },
    // Fast Eyeball User
    {
      id: "fast_eyeball_user_n",
      accessorKey: "fast_eyeball_user_n",
      header: "Fast Eyeball User",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.fast_eyeball_user_n || "-"}</p>,
    },
    // Account Link Code
    {
      id: "account_link_code_n",
      accessorKey: "account_link_code_n",
      header: "Account Link Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.account_link_code_n || "-"}</p>,
    },
    // Subscriber Code
    {
      id: "subscriber_code_n",
      accessorKey: "subscriber_code_n",
      header: "Subscriber Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.subscriber_code_n || "-"}</p>,
    },
    // Dealer Division
    {
      id: "dealer_division",
      accessorKey: "dealer_division",
      header: "Dealer Division",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.dealer_division || "-"}</p>,
    },
    // Seq No
    {
      id: "seq_no_n",
      accessorKey: "seq_no_n",
      header: "Seq No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.seq_no_n || "-"}</p>,
    },
    // MSISDN
    {
      id: "msisdn_v",
      accessorKey: "msisdn_v",
      header: "MSISDN",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.msisdn_v || "-"}</p>,
    },
    // Last Name
    {
      id: "last_name_v",
      accessorKey: "last_name_v",
      header: "Last Name",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.last_name_v || "-"}</p>,
    },
    // First Name
    {
      id: "first_name_v",
      accessorKey: "first_name_v",
      header: "First Name",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.first_name_v || "-"}</p>,
    },
    // Mother Maiden Name
    {
      id: "mother_maiden_v",
      accessorKey: "mother_maiden_v",
      header: "Mother Maiden Name",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.mother_maiden_v || "-"}</p>,
    },
    // Gender
    {
      id: "gender_v",
      accessorKey: "gender_v",
      header: "Gender",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.gender_v || "-"}</p>,
    },
    // Date of Birth
    {
      id: "date_of_birth",
      accessorKey: "date_of_birth",
      header: "Date of Birth",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.date_of_birth || "-"}</p>,
    },
    // Nationality
    {
      id: "nationality_v",
      accessorKey: "nationality_v",
      header: "Nationality",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.nationality_v || "-"}</p>,
    },
    // SIM Number
    {
      id: "sim_number_v",
      accessorKey: "sim_number_v",
      header: "SIM Number",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.sim_number_v || "-"}</p>,
    },
    // Pin Ref Num
    {
      id: "pin_ref_num_v",
      accessorKey: "pin_ref_num_v",
      header: "Pin Ref Num",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.pin_ref_num_v || "-"}</p>,
    },
    // Status
    {
      id: "status_v",
      accessorKey: "status_v",
      header: "Status",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.status_v || "-"}</p>,
    },
    // SIM Reg Type
    {
      id: "sim_reg_type_v",
      accessorKey: "sim_reg_type_v",
      header: "SIM Reg Type",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.sim_reg_type_v || "-"}</p>,
    },
    // Updated Date
    {
      id: "updated_dt",
      accessorKey: "updated_dt",
      header: "Updated Date",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.updated_dt || "-"}</p>,
    },
    // Remarks
    {
      id: "remarks_v",
      accessorKey: "remarks_v",
      header: "Remarks",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.remarks_v || "-"}</p>,
    },
    // Provident Status
    {
      id: "provident_status",
      accessorKey: "provident_status",
      header: "Provident Status",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.provident_status || "-"}</p>,
    },
    // AGL Status
    {
      id: "agl_status",
      accessorKey: "agl_status",
      header: "AGL Status",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.agl_status || "-"}</p>,
    },
    // Occupation
    {
      id: "occupation_v",
      accessorKey: "occupation_v",
      header: "Occupation",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.occupation_v || "-"}</p>,
    },
    // SIM
    {
      id: "sim_v",
      accessorKey: "sim_v",
      header: "SIM",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.sim_v || "-"}</p>,
    },
    // Identification Number
    {
      id: "identification_number",
      accessorKey: "identification_number",
      header: "Identification Number",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.identification_number || "-"}</p>,
    },
    // Address 1
    {
      id: "address1",
      accessorKey: "address1",
      header: "Address 1",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.address1 || "-"}</p>,
    },
    // Address 2
    {
      id: "address2",
      accessorKey: "address2",
      header: "Address 2",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.address2 || "-"}</p>,
    },
    // Address 3
    {
      id: "address3",
      accessorKey: "address3",
      header: "Address 3",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.address3 || "-"}</p>,
    },
    // Street Description
    {
      id: "street_desc",
      accessorKey: "street_desc",
      header: "Street Description",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.street_desc || "-"}</p>,
    },
    // Transaction ID
    {
      id: "transaction_id",
      accessorKey: "transaction_id",
      header: "Transaction ID",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.transaction_id || "-"}</p>,
    },
    // Uploaded Date
    {
      id: "uploaded_date",
      accessorKey: "uploaded_date",
      header: "Uploaded Date",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.uploaded_date || "-"}</p>,
    },
    // Vendor Channel
    {
      id: "vendor_channel",
      accessorKey: "vendor_channel",
      header: "Vendor Channel",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.vendor_channel || "-"}</p>,
    },
    // SIM Reg Device ID
    {
      id: "sim_reg_device_id",
      accessorKey: "sim_reg_device_id",
      header: "SIM Reg Device ID",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.sim_reg_device_id || "-"}</p>,
    },
    // Device User ID
    {
      id: "device_user_id",
      accessorKey: "device_user_id",
      header: "Device User ID",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.device_user_id || "-"}</p>,
    },
    // LGA
    {
      id: "lga",
      accessorKey: "lga",
      header: "LGA",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.lga || "-"}</p>,
    },
    // State
    {
      id: "state",
      accessorKey: "state",
      header: "State",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.state || "-"}</p>,
    },
    // Other Name
    {
      id: "other_name",
      accessorKey: "other_name",
      header: "Other Name",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.other_name || "-"}</p>,
    },
    // Region Code
    {
      id: "region_code",
      accessorKey: "region_code",
      header: "Region Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.region_code}</p>,
    },
    // State Code
    {
      id: "state_code",
      accessorKey: "state_code",
      header: "State Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.state_code}</p>,
    },
    // LG Code
    {
      id: "lg_code",
      accessorKey: "lg_code",
      header: "LG Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.lg_code}</p>,
    },
  ];

  useEffect(() => {
    const localStorageColumns = localStorage.getItem("columnVisibility_ssp");
    if (localStorageColumns) {
      const parsedColumns: string = Object.entries(
        JSON.parse(localStorageColumns)
      )
        .filter(([key, value]) => value === true && key !== "sn")
        .map(([key]) => key)
        .join(",");
      setColumns(parsedColumns);
    } else {
      const visibleColumns = sspColumns?.reduce(
        (acc: Record<string, boolean>, column: ColumnDef<ISSPDetail>) => {
          if (column.id) {
            acc[column.id] = column.enableHiding ? false : true;
          }
          return acc;
        },
        {}
      );

      localStorage.setItem(
        "columnVisibility_ssp",
        JSON.stringify(visibleColumns)
      );
      const parsedColumns: string = Object.keys(visibleColumns)
        .filter((key) => key !== "sn")
        .join(",");
      setColumns(parsedColumns);
    }
  }, []);
  return {
    // STATES
    searchText,
    setSearchText,
    perPage,
    setPerPage,
    page,
    setPage,

    // Functions
    searchTextHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,
    applyColumns,

    // API
    sspList,
    sspListLoading,

    // Column
    sspColumns,
  };
};

export default useSSP;
