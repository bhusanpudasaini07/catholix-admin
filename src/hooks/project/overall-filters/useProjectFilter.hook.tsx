import { useCommonStore } from "@/store/common-store";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const useProjectFilter = () => {
  const { filterConfig } = useCommonStore();
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all_date");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  // For sources, status, type, risk status , market , leads and client
  const [filterStates, setFilterStates] = useState({
    leads: "",
    clients: "",
    sources: "",
    status: "",
    type: "",
    risk_status: "",
    market: "",
  });

  const [filterSaved, setFilterSaved] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<
    {
      fullname: string;
      id: string;
    }[]
  >([]);
  const options = ["all_date", "added_date", "start_date", "end_date"];

  const changeFilterRadio = (type: string) => {
    setSelectedOption(type);
    if (type !== "allDates") {
      setDateRange({ from: undefined, to: undefined });
    }
  };

  const changeFilterState = (key: keyof typeof filterStates, value: string) => {
    setFilterStates((prev) => ({ ...prev, [key]: value }));
  };

  // Generic function for changing filter to added comma seperated value to filterState
  const handleCheckboxChange =
    (filterKey: keyof typeof filterStates, value: string) =>
    (isChecked: boolean) => {
      const currentValues = filterStates[filterKey]
        ? filterStates[filterKey].split(",")
        : [];
      const updatedValues = isChecked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      changeFilterState(filterKey, updatedValues.join(","));
    };

  // Generic funciton for making it select all checkbox of required key
  const selectAllCheckbox = (
    filterConfigKey: string,
    key: string,
    value: any
  ) => {
    setFilterStates((prev) => ({
      ...prev,
      [key]: value
        ? key === "market"
          ? filterConfig?.[filterConfigKey]
              ?.map((item: any) => item.id)
              .join(",")
          : filterConfig?.[filterConfigKey]?.map((item: any) => item).join(",")
        : "",
    }));
  };

  const saveFilterToLocal = () => {
    setFilterSaved(!filterSaved);
    localStorage.setItem("savedFilter", JSON.stringify(filterStates));
  };
  /**
   * Clear all selected filters
   */
  const clearAllFilter = () => {
    setDateRange({
      from: undefined,
      to: undefined,
    });
    setSelectedOption("all_date");
    setFilterStates({
      leads: "",
      clients: "",
      sources: "",
      status: "",
      type: "",
      risk_status: "",
      market: "",
    });
    setSelectedLeads([]);
  };

  useEffect(() => {
    const leadsIds = selectedLeads.map((lead) => lead.id).join(",");
    setFilterStates((prev) => ({ ...prev, leads: leadsIds }));
  }, [selectedLeads, setFilterStates]);

  return {
    filterSheetOpen,
    setFilterSheetOpen,
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
    changeFilterState,
    handleCheckboxChange,
    selectAllCheckbox,
    saveFilterToLocal,
    filterSaved,
    setFilterSaved,
    selectedLeads,
    setSelectedLeads,
  };
};

export default useProjectFilter;
