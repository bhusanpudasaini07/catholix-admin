import { DataTable } from "@/shared/components/data-table/data-table";
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
import React, { useState } from "react";

const RoleCountryTable = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

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
        <div className="font-medium underline text-primary hover:text-blue-700"></div>
      ),
      enableHiding: false,
    },
    // Date
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
    {
      id: "country",
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
    {
      id: "man_days",
      accessorKey: "man_days",
      header: "Man Days",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
    {
      id: "man_month",
      accessorKey: "man_month",
      header: "Man Month",
      cell: ({ row }) => <div></div>,
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
          <div className="flex items-center gap-2 flex-wrap">
            <h5 className="font-medium text-zinc-700">
              Role-Wise Country Project
            </h5>
            <Button variant={"white"} size={"sm"}>
              Detail View
            </Button>
          </div>
          <div className="flex gap-2 justify-end items-center flex-wrap">
            <Input
              placeholder="Search Keywords"
              className="w-[160px] h-[36px]"
            />
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
        <div className="flex items-center flex-wrap justify-end gap-3">
          {countries.map((country) => (
            <div
              className="flex justify-start items-center gap-1"
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
          border={true}
          columns={columns}
          data={[]}
        />
      </CardContent>
    </Card>
  );
};

export default RoleCountryTable;
