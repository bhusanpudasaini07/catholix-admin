import ReactECharts from "echarts-for-react";
import { DownloadCloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { getConfig } from "@/services/dashboard/dashboard-service";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { CountryButtonCheckbox } from "@/shared/components/ui/country-checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { DownloadExcel } from "@/shared/utils/download/download.utils";
import {
  calculateTimeLog,
  calculateUsedAndUnusedRpPercentage,
} from "@/shared/utils/rp-utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";

interface Market {
  id: string;
  title: string;
  flag: string;
}

interface Role {
  index: number;
  title: string;
}

interface AllTimeProjectsProps {
  allTimeProjectData: any[];
  allTimeProjectLoading: boolean;
}

const AllTimeProjects: React.FC<AllTimeProjectsProps> = ({
  allTimeProjectData,
  allTimeProjectLoading,
}) => {
  const [role, setRole] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const { filterConfig } = useCommonStore();

  const { data: filterData, isLoading: filterLoading } = useQuery<any>(
    "getConfig",
    async () => {
      const response = await getConfig();
      return response;
    }
  );

  const handleCheckboxChange = (market: Market) => (isChecked: boolean) => {
    setSelectedMarkets((prevMarkets) =>
      isChecked
        ? [...prevMarkets, market?.id]
        : prevMarkets.filter((id) => id !== market?.id)
    );
  };

  const filteredAllTimeProjectData = useMemo(() => {
    let filteredData = allTimeProjectData;

    if (searchText) {
      filteredData = filteredData?.filter((staff) =>
        staff?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
    }

    if (role && role !== "all") {
      filteredData = filteredData?.filter(
        (staff) => staff?.role_name?.toLowerCase() === role?.toLowerCase()
      );
    }

    if (selectedMarkets.length > 0) {
      filteredData = filteredData?.filter((staff) =>
        selectedMarkets.includes(staff?.market_id)
      );
    }

    return filteredData;
  }, [allTimeProjectData, searchText, role, selectedMarkets]);

  const columns: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S. No.",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-sm font-medium w-[40px] ps-3">
          {row?.index + 1}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Project",
      cell: ({ row }) => (
        <Link
          href={`/projects/${row?.original?.code}`}
          className="text-sm font-semibold text-primary"
        >
          {row.getValue("name")}
        </Link>
      ),
      enableHiding: false,
    },
    {
      id: "source",
      accessorKey: "source",
      header: "Project Type",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("source")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={"outline"}
          className={`whitespace-nowrap 
        ${
          row.getValue("status") === "In Progress" &&
          " border-blue-500 text-blue-500 bg-blue-50 "
        }
        ${
          row.getValue("status") === "Client Support" &&
          " border-orange-500 text-orange-500 bg-orange-50"
        }
        ${
          row.getValue("status") === "On Hold" &&
          " border-red-500 text-red-500 bg-red-50"
        }
      ${
        ["Closed", "Delivered"].includes(row.getValue("status")) &&
        " border-green-500 text-green-500 bg-green-50"
      }
      ${
        row.getValue("status") === "Not Started" &&
        " border-zinc-500 text-zinc-500 bg-zinc-50"
      }
       capitalize border rounded-md`}
        >
          {row.getValue("status")}
        </Badge>
      ),
      enableHiding: false,
    },

    {
      id: "market_id",
      accessorKey: "market_id",
      header: "Market",
      cell: ({ row }) => {
        const market = filterData?.data?.markets?.find(
          (item: any) => item?.id === row?.original?.market_id
        );
        return (
          <div>
            {market && (
              <Image
                src={market?.flag}
                height={16}
                width={16}
                style={{ objectFit: "contain" }}
                alt="Flag"
              />
            )}
          </div>
        );
      },
      enableHiding: false,
    },
    {
      id: "role_name",
      accessorKey: "role_name",
      header: "Role",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("role_name")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "sales_rp",
      accessorKey: "sales_rp",
      header: "Available Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("sales_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "overall_used_rp",
      accessorKey: "overall_used_rp",
      header: "Spent Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500 cursor-pointer">
          {row.getValue("overall_used_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Contribution",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500 cursor-pointer">
          {row.getValue("rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "budget_percentage",
      accessorKey: "budget_percentage",
      header: "Budget %",
      cell: ({ row }) => {
        const { usedPercentage, unusedPercentage } =
          calculateUsedAndUnusedRpPercentage(
            row?.original?.overall_used_rp,
            row?.original?.rp
          );
        const tableOption = {
          color: ["#FACC15", "#F4F4F5"],
          tooltip: {
            trigger: "item",
            formatter: function (value: any) {
              return `${value?.data?.name} <br/> ${value?.data?.value}%`;
            },
          },
          legend: {
            show: false,
          },

          series: [
            {
              type: "pie",
              radius: "100%",
              data: [
                {
                  value: usedPercentage,
                  name: `Individual Budget Used`,
                },
                { value: unusedPercentage, name: "Team Budget Used" },
              ],
              label: {
                show: false,
              },
              emphasis: {
                scale: false,
              },
            },
          ],
        };

        return (
          <div className="text-sm font-semibold text-zinc-700">
            <ReactECharts option={tableOption} style={{ maxHeight: "40px" }} />
          </div>
        );
      },
      enableHiding: false,
    },
    {
      id: "time",
      accessorKey: "time",
      header: "Total Time",
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row?.original?.time);
        return (
          <div className="text-sm font-semibold text-zinc-500 cursor-pointer">
            {hours ? `${hours}H` : ""} {minutes}M
          </div>
        );
      },
      enableHiding: false,
    },
  ];

  const handleDownloadSubFeature = () => {
    const mappedData = filteredAllTimeProjectData?.map((item, index) => ({
      "S.N": index + 1,
      Project: item?.name,
      "Project Type": item?.source,
      Role: item?.role,
      "Spent Budget": item?.spent_rp,
      "Spent Budget (Client)": item?.spent_client_rp,
      "Loss Budget": item?.loss_rp,
      "% Budget": item?.rp_percentage,
      "% Budget Client": item?.client_rp_percentage,
      "Total Time": item?.total_time,
      "Spent Time": item?.spent_time,
      "% Time": item?.time_percentage,
      "% Time(Client)": item?.client_time_percentage,
    }));

    DownloadExcel(mappedData, `MEMBER_ALL_PROJECT`);
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="font-medium text-zinc-700">All Time Projects</h5>
            <Button variant="white" size="sm">
              View All
            </Button>
          </div>
          <div className="flex items-center justify-end gap-2">
            <FilterSearch className="!py-2" setSearchText={setSearchText} />
            <Select onValueChange={setRole}>
              <SelectTrigger className="min-w-[260px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-auto">
                <SelectItem key="all" value="all">
                  All
                </SelectItem>
                {filterData?.data?.roles?.map((role: Role) => (
                  <SelectItem key={role?.index} value={role?.title}>
                    {role?.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={handleDownloadSubFeature}
              variant="success"
            >
              <DownloadCloud size={16} />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-1 mb-3">
          {filterConfig?.markets?.map((market: Market) => (
            <CountryButtonCheckbox
              key={market?.id}
              label={market?.title}
              value={market?.title}
              checked={selectedMarkets.includes(market?.id)}
              onCheckedChange={handleCheckboxChange(market)}
              flagImageUrl={market?.flag}
            />
          ))}
        </div>
        <DataTable
          loading={allTimeProjectLoading}
          height="max-h-[700px]"
          headerSticky
          border
          columns={columns}
          data={filteredAllTimeProjectData}
        />
      </CardContent>
    </Card>
  );
};

export default AllTimeProjects;
