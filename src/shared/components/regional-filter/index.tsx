import React, { useState, useEffect } from "react";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { IRegionProps } from "@/interface/common-interface";
import { useQuery } from "react-query";
import { getRegions } from "@/services/admin/admin-service";
import { useCommonStore } from "@/store/common-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/shared/utils/utils";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface ILGA {
  id: number;
  name: string;
}

interface IProps {
  regionId: string;
  stateId: string;
  setRegionId: (value: string) => void;
  setStateId: (value: string) => void;
  lga: string[];
  setLga: (lga: string[]) => void;
  hideLga?: boolean;
}

const RegionalFilter = ({
  regionId,
  stateId,
  setRegionId,
  setStateId,
  lga,
  setLga,
  hideLga = false,
}: IProps) => {
  const { profileData } = useCommonStore();
  const [localGovernments, setLocalGovernments] = useState<ILGA[]>([]);
  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  const filterLocalGovs = (id: string) => {
    setStateId(id);
    const state = regionsList?.data?.regions
      ?.find((region) => region?.id === Number(regionId))
      ?.states?.find((state) => state?.id === Number(id));
    setLocalGovernments(state?.localGovernments ?? []);
    setLga([]);
  };

  const addLGA = (localGov: string) => {
    setLga([...lga, localGov]);
  };

  const removeLGA = (localGov: string) => {
    setLga(lga.filter((l) => Number(l) !== Number(localGov)));
  };

  useEffect(() => {
    if (profileData.regionId !== 0) {
      setRegionId(profileData.regionId?.toString());
      setStateId(profileData.stateId?.toString());
      const state = regionsList?.data?.regions
        ?.find((region) => region.id === profileData.regionId)
        ?.states?.find((state) => state.id === profileData.stateId);
      setLocalGovernments(state?.localGovernments ?? []);
      setLga(profileData.localGovId || []);
    } else {
      setRegionId("0");
      setStateId("0");
      setLocalGovernments([]);
      setLga([]);
    }
  }, [profileData, regionsList]);

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
          disabled={profileData.regionId !== 0}
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
          disabled={
            regionId === "0" ||
            (profileData.stateId !== null && profileData.stateId !== 0)
          }
          value={stateId}
          onValueChange={filterLocalGovs}
        >
          <SelectTrigger className="min-w-[160px]">
            <SelectValue placeholder="Select State" />
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
      {!hideLga && (
        <div className="flex flex-col gap-2">
          <Label>Select LGA</Label>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"select"}
                disabled={stateId === "0" && profileData.stateId !== 0}
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
                <div
                  className="flex gap-2 items-center p-1"
                  key={localGovernment.id}
                >
                  <Checkbox
                    id={localGovernment?.id.toString()}
                    variant="primary"
                    disabled={
                      profileData?.localGovId?.length > 0 &&
                      !profileData.localGovId?.includes(
                        localGovernment.id.toString()
                      )
                    }
                    checked={lga.some((l) => Number(l) === localGovernment.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        return addLGA(localGovernment.id.toString());
                      } else {
                        return removeLGA(localGovernment.id.toString());
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
      )}
    </div>
  );
};

export default RegionalFilter;
