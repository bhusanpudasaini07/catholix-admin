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
import { MultiSelect } from "../multi-select";

interface IProps {
  regionId: string;
  stateId: string;
  setRegionId: (value: string) => void;
  setStateId: (value: string) => void;
  lga: { id: number; name: string }[];
  setLga: (lga: { id: number; name: string }[]) => void;
}

const RegionalFilter = ({
  regionId,
  stateId,
  setRegionId,
  setStateId,
  lga,
  setLga,
}: IProps) => {
  const [localGovernments, setLocalGovernments] = useState<ILocalGovernment[]>(
    []
  );

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

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col gap-2">
        <Label className="font-normal">Select Region</Label>
        <Select value={regionId} onValueChange={setRegionId}>
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
        <Label className="font-normal">Select State</Label>
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
        <Label className="font-normal">Select LGA</Label>
        <MultiSelect
          disabled={stateId === "0"}
          dataList={localGovernments?.map((lg) => ({
            id: lg?.id,
            name: lg?.name,
          }))}
          placeholder={"Select LGA"}
          selected={lga}
          setSelected={setLga}
          module="LGA"
        />
      </div>
    </div>
  );
};

export default RegionalFilter;
