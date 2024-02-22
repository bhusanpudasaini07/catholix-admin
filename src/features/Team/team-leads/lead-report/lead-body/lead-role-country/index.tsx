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
import React, { FC, useState } from "react";

interface IProps {
  data: any;
}

const RoleCountryTable: FC<IProps> = ({ data }) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

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
      cell: ({ row }) => <div>{row.getValue("sn")}</div>,
      enableHiding: false,
    },
    // Date
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div>{row.getValue("role")}</div>,
      enableHiding: false,
    },
    {
      id: "country",
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => <div>{row.getValue("country")}</div>,
      enableHiding: false,
    },
    {
      id: "manDays",
      accessorKey: "manDays",
      header: "Man Days",
      cell: ({ row }) => (
        <div>{parseInt(row.getValue("manDays")).toFixed(2)}</div>
      ),
      enableHiding: false,
    },
    {
      id: "manMonths",
      accessorKey: "manMonths",
      header: "Man Month",
      cell: ({ row }) => <div>{row.getValue("manMonths")}</div>,
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
  const tableData = data?.map((staff: any, index: any) => ({
    sn: index + 1,
    role: staff?.role_name,
    // country: staff?.department_name, // Assuming department_name represents the country
    country: "Nepal", // Assuming department_name represents the country
    manDays: (parseFloat(staff?.used_time) / (7 * 3600)).toFixed(2), // Converting seconds to man-days -> (assuming 7 working hours per day)
    manMonths: (parseFloat(staff?.used_time) / (7 * 3600 * 22)).toFixed(2), // Converting seconds to man-months (assuming 22 working days per month)
  }));

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-3 mb-6 ">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="font-medium text-zinc-700">
              Role-Wise Country Project
            </h5>
            <Button variant={"white"} size={"sm"}>
              Detail View
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {/* <Input
              placeholder="Search Keywords"
              className="w-[160px] h-[36px]"
            /> */}
            <FilterSearch setSearchText={setSearchText} />
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pm">PM</SelectItem>
              </SelectContent>
            </Select>
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
          data={tableData || []}
        />
      </CardContent>
    </Card>
  );
};

export default RoleCountryTable;
