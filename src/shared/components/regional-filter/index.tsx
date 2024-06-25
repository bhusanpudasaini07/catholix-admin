import React, { useState } from "react";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ILocalGovernment, IRegionProps } from "@/interface/common-interface";
import { useQuery } from "react-query";
import { getRegions } from "@/services/admin/admin-service";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/shared/utils/utils";

interface ILGA {
  id: number;
  name: string;
}

interface IProps {
  regionId: string;
  stateId: string;
  setRegionId: (value: string) => void;
  setStateId: (value: string) => void;
  lga: ILGA[];
  setLga: (lga: ILGA[]) => void;
}

const RegionalFilter = ({
  regionId,
  stateId,
  setRegionId,
  setStateId,
  lga,
  setLga,
}: IProps) => {
  const [localGovernments, setLocalGovernments] = useState<ILGA[]>([]);

  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  // Functions
  const filterLocalGovs = (id: string) => {
    setStateId(id);
    const state = regionsList?.data?.regions
      ?.find((region) => region?.id === Number(regionId))
      ?.states?.find((state) => state?.id === Number(id));
    setLocalGovernments(state?.localGovernments ?? []);
    setLga([]);
  };

  const addLGA = (localGov: ILGA) => {
    setLga([...lga, localGov]);
  };

  const removeLGA = (localGov: ILGA) => {
    setLga(lga.filter((l) => l.id !== localGov.id));
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col gap-2">
        <Label>Select Region</Label>
        <Select
          value={regionId}
          onValueChange={(e) => {
            setRegionId(e);
            setStateId("0");
            setLga([]);
          }}
        >
          <SelectTrigger className="min-w-[160px]">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent className="z-[400]">
            <SelectItem value="0">All</SelectItem>
            {regionsList?.data?.regions?.map((region) => (
              <SelectItem key={region.id} value={region.id.toString()}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Select State</Label>
        <Select
          disabled={regionId === "0"}
          value={stateId}
          onValueChange={filterLocalGovs}
        >
          <SelectTrigger className="min-w-[160px]">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent className="z-[400]">
            <SelectItem value="0">All</SelectItem>
            {regionsList?.data?.regions
              ?.find((region) => region.id === Number(regionId))
              ?.states?.map((state) => (
                <SelectItem key={state.id} value={state.id.toString()}>
                  {state.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Select LGA</Label>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"select"}
              disabled={stateId === "0"}
              className={cn(
                "w-[150px] h-9",
                stateId === "0" && "pointer-events-none"
              )}
            >
              {lga.length > 0 ? `${lga.length} selected` : "Select LGA's"}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            loop
            className="z-[400] max-h-[250px] overflow-auto p-2 flex flex-col gap-2"
          >
            {localGovernments.map((localGovernment) => (
              <div className="flex gap-2 items-center p-1">
                <Checkbox
                  id={localGovernment?.id.toString()}
                  variant="primary"
                  checked={lga.some((l) => l.id === localGovernment.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      return addLGA(localGovernment);
                    } else {
                      return removeLGA(localGovernment);
                    }
                  }}
                />
                <Label htmlFor={localGovernment.id.toString()}>
                  {localGovernment.name}
                </Label>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default RegionalFilter;
