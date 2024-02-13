import React from "react";

import { useCommonStore } from "@/store/common-store";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { Button } from "@/shared/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { ButtonCheckbox } from "@/shared/components/ui/button-checkbox";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { Checkbox } from "@/shared/components/ui/checkbox";
import DateRangeFilter from "@/shared/components/date-range-filter";
import { MultiSelect } from "@/shared/components/multi-select";
import useProjectListing from "@/hooks/project/useProjectListing.hook";

interface IProps {
  filterSheetOpen: boolean;
  setFilterSheetOpen: (arg: boolean) => void;
}

const FilterSheet = ({ filterSheetOpen, setFilterSheetOpen }: IProps) => {
  const { filterConfig } = useCommonStore();

  const {
    selectedOption,
    setSelectedOption,
    dateRangeOpen,
    setDateRangeOpen,
    dateRange,
    setDateRange,
    options,
    changeFilterRadio,
    clearAllFilter,
    filterStates,
    setFilterStates,
    handleCheckboxChange,
    selectAllCheckbox,
    saveFilterToLocal,
    selectedLeads,
    setSelectedLeads,
  } = useProjectListing();

  return (
    <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
      <SheetContent className="lg:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between max-w-[90%]">
            <p>Filters</p>
            <Button onClick={clearAllFilter} variant={"table"} size={"sm"}>
              Clear All
            </Button>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 mt-8 h-[calc(100vh-190px)] pr-3 overflow-y-scroll">
          {/* Date Filter */}
          <div>
            <p className="mb-1 text-sm font-medium text-zinc-700">Date</p>
            <RadioGroup
              value={selectedOption}
              defaultValue={selectedOption}
              onValueChange={(e) => setSelectedOption(e)}
            >
              {options.map((option) => (
                <div className="mb-2" key={option}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option}
                      id={option}
                      className={
                        selectedOption === option
                          ? "border-primary"
                          : "border-zinc-200"
                      }
                      onChange={() => changeFilterRadio(option)}
                    />
                    <Label
                      className="capitalize cursor-pointer"
                      htmlFor={option}
                    >
                      {option
                        .replace(/_/g, " ")
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                    </Label>
                  </div>
                  {selectedOption !== "all_date" &&
                    selectedOption === option && (
                      <div className="pl-6 mt-4">
                        <DateRangeFilter
                          dateRangeOpen={dateRangeOpen}
                          setDateRangeOpen={setDateRangeOpen}
                          setDateRange={setDateRange}
                          dateRange={dateRange}
                        />
                      </div>
                    )}
                </div>
              ))}
            </RadioGroup>
          </div>
          {/* Project Lead */}
          <div>
            <p className="mb-2 text-sm font-medium text-zinc-700">
              Project Lead
            </p>

            <MultiSelect
              selected={selectedLeads}
              setSelected={setSelectedLeads}
              dataList={filterConfig?.project_leads}
              placeholder={"Select Leads"}
            />
          </div>

          {/* Clients */}
          <div>
            <p className="mb-2 text-sm font-medium text-zinc-700">Clients</p>
            <Select
              value={filterStates?.clients}
              onValueChange={(e) =>
                setFilterStates({ ...filterStates, clients: e })
              }
            >
              <SelectTrigger className="border-zinc-200">
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>

              <SelectContent className="max-h-[300px]">
                <SelectGroup>
                  {filterConfig?.clients?.map((client: any) => (
                    <SelectItem value={client?.id} key={client?.id}>
                      {client?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Source */}
          <div>
            <p className="flex items-center gap-2 mb-2 text-sm font-medium text-zinc-700">
              <Checkbox
                variant="primary"
                value="all"
                onCheckedChange={(e) =>
                  selectAllCheckbox("project_sources", "sources", e)
                }
                checked={filterConfig?.project_sources?.every(
                  (source: string) =>
                    filterStates?.sources?.split(",").includes(source)
                )}
              />
              Source
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {filterConfig?.project_sources?.map((source: any) => (
                <ButtonCheckbox
                  label={source}
                  value={source}
                  key={source}
                  checked={filterStates?.sources?.split(",").includes(source)}
                  onCheckedChange={handleCheckboxChange("sources", source)}
                />
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="flex items-center gap-2 mb-2 text-sm font-medium text-zinc-700">
              <Checkbox
                variant="primary"
                value="all"
                onCheckedChange={(e) =>
                  selectAllCheckbox("project_status", "status", e)
                }
                checked={filterConfig?.project_status?.every((status: string) =>
                  filterStates?.status?.split(",").includes(status)
                )}
              />
              Status
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {filterConfig?.project_status?.map((status: any) => (
                <ButtonCheckbox
                  label={status}
                  value={status}
                  key={status}
                  checked={filterStates?.status?.split(",").includes(status)}
                  onCheckedChange={handleCheckboxChange("status", status)}
                />
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <p className="flex items-center gap-2 mb-2 text-sm font-medium text-zinc-700">
              <Checkbox
                variant="primary"
                value="all"
                onCheckedChange={(e) =>
                  selectAllCheckbox("project_types", "type", e)
                }
                checked={filterConfig?.project_types?.every((type: string) =>
                  filterStates?.type?.split(",").includes(type)
                )}
              />
              Type
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {filterConfig?.project_types?.map((type: any) => (
                <ButtonCheckbox
                  label={type}
                  key={type}
                  value={type}
                  checked={filterStates?.type?.split(",").includes(type)}
                  onCheckedChange={handleCheckboxChange("type", type)}
                />
              ))}
            </div>
          </div>

          {/* Risk Status */}
          <div>
            <p className="flex items-center gap-2 mb-2 text-sm font-medium text-zinc-700">
              <Checkbox
                variant="primary"
                value="all"
                onCheckedChange={(e) =>
                  selectAllCheckbox("project_risks", "risk_status", e)
                }
                checked={filterConfig?.project_risks?.every((risk: string) =>
                  filterStates?.risk_status?.split(",").includes(risk)
                )}
              />
              Risk Status
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {filterConfig?.project_risks?.map((risk: any) => (
                <ButtonCheckbox
                  label={risk}
                  value={risk}
                  key={risk}
                  checked={filterStates?.risk_status?.split(",").includes(risk)}
                  onCheckedChange={handleCheckboxChange("risk_status", risk)}
                />
              ))}
            </div>
          </div>

          {/* Market */}
          <div>
            <p className="flex items-center gap-2 mb-2 text-sm font-medium text-zinc-700">
              <Checkbox
                variant="primary"
                value="all"
                onCheckedChange={(e) =>
                  selectAllCheckbox("markets", "market", e)
                }
                checked={filterConfig?.markets?.every((market: any) =>
                  filterStates?.market?.split(",").includes(market?.id)
                )}
              />
              Market
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {filterConfig?.markets?.map((market: any) => (
                <ButtonCheckbox
                  label={market?.title}
                  value={market?.id}
                  key={market?.id}
                  checked={filterStates?.market
                    ?.split(",")
                    .includes(market?.id)}
                  onCheckedChange={handleCheckboxChange("market", market?.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-9">
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              setFilterSheetOpen(false);
              saveFilterToLocal();
            }}
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
