import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

interface IProps {
  data: any;
}
const ProjectRpConsumptionTable: FC<IProps> = ({ data }) => {
  const router = useRouter();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const total = data?.reduce(
    (acc: number, obj: any) => acc + parseFloat(obj.total_rp),
    0
  );

  const calculatePercentage = (used: number, total: number): number => {
    if (total === 0) {
      return 0; // to avoid division by zero
    }
    return (used / total) * 100;
  };

  const countries = [
    {
      name: "Nepal",
      code: "NP",
      flagUrl: "",
    },
    {
      name: "US",
      code: "US",
      flagUrl: "",
    },
    {
      name: "UK",
      code: "UK",
      flagUrl: "",
    },
  ];

  const columns: ColumnDef<any>[] = [
    // Title
    {
      id: "sn",
      accessorKey: "sn",
      header: "S. No.",
      cell: ({ row }) => (
        <div className="">
          {/* {row?.getValue('')} */}
          {row.index + 1}
        </div>
      ),
      enableHiding: false,
    },
    // Date
    {
      id: "title",
      accessorKey: "title",
      header: "Project",
      cell: ({ row }) => <div>{row?.getValue("title")}</div>,
      enableHiding: false,
    },
    {
      id: "market",
      accessorKey: "market",
      header: "Country",
      cell: ({ row }) => <div>{row?.getValue("market")}</div>,
      enableHiding: false,
    },
    {
      id: "total_rp",
      accessorKey: "total_rp",
      header: "RP Consumption",
      cell: ({ row }) => <div>{row?.getValue("total_rp")}</div>,
      enableHiding: false,
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => (
        <div>
          {calculatePercentage(row?.original?.total_rp, total).toFixed(2)}%
        </div>
      ),
      enableHiding: false,
    },
  ];
  const handleCountryToggle = (code: any) => {
    setSelectedCountries((prevSelectedCountries) => {
      if (prevSelectedCountries.includes(code)) {
        return prevSelectedCountries.filter((c) => c !== code);
      } else {
        return [...prevSelectedCountries, code];
      }
    });
  };
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-3 mb-6 ">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="font-medium text-zinc-700">
              Project RP Consumption
            </h5>
            <Button
              variant={"white"}
              onClick={() =>
                router?.push(
                  `/team-leads/lead-report/project-rp-consumption?lead_id=${router?.query?.lead_id}`
                )
              }
              size={"sm"}
            >
              View All
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <FilterSearch setSearchText={setSearchText} />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          {countries.map((country) => (
            <div
              className="flex items-center justify-start gap-1"
              key={country.code}
            >
              <input
                type="checkbox"
                id={country.code}
                value={country.code}
                checked={selectedCountries.includes(country.code)}
                onChange={() => handleCountryToggle(country.code)}
              />
              <label htmlFor={country.code}>
                {country.flagUrl && (
                  <Image
                    src={country.flagUrl}
                    alt={country.name}
                    width={64}
                    height={64}
                  />
                )}
                <span className="text-sm font-normal text-zinc-700">
                  {country.name}
                </span>
              </label>
            </div>
          ))}
        </div>
        <DataTable
          // loading={isLoading}
          height={"max-h-[500px]"}
          headerSticky
          border={true}
          columns={columns}
          data={data || []}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectRpConsumptionTable;
