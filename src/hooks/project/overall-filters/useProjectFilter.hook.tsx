import { useCommonStore } from "@/store/common-store";
import moment from "moment";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const useProjectFilter = () => {
  const { filterConfig, filterSaved, setFilterSaved } = useCommonStore();

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all_date");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);

  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // For sources, status, type, risk status , market , leads and client
  const [filterStates, setFilterStates] = useState({
    leads: "",
    clients: "",
    sources: "",
    status: "",
    type: "",
    risk_status: "",
    market: "",
    date: "",
    date_type: "",
  });

  const [selectedLeads, setSelectedLeads] = useState<
    {
      fullname: string;
      id: string;
    }[]
  >([]);

  const options = ["all_date", "added_date", "start_date", "end_date"];
  const changeFilterRadio = (type: string) => {
    setSelectedOption(type);
    setDateRange({
      from: undefined,
      to: undefined,
    });
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

  /**
   * Clear all selected filters
   */
  const clearAllFilter = () => {
    const clearFields = {
      leads: "",
      clients: "",
      sources: "",
      status: "",
      type: "",
      risk_status: "",
      market: "",
      date: "",
      date_type: "",
    };
    setDateRange(undefined);
    setSelectedOption("all_date");
    setFilterStates(clearFields);
    setSelectedLeads([]);
  };

  const handleDateRangeChange = (date: any) => {
    setDateRange({ from: date?.from, to: date?.to });
  };

  // To show market, leads and clients name in filter UI
  const filterMarkets = (value: string) => {
    const name = filterConfig?.markets?.find(
      (item: any) => item?.id === value
    )?.title;
    return name;
  };
  const filterLeads = (value: string) => {
    const name = filterConfig?.project_leads?.find(
      (item: any) => item?.id === value
    )?.fullname;
    return name;
  };
  const filterClients = (value: string) => {
    const name = filterConfig?.clients?.find(
      (item: any) => item?.id === value
    )?.name;
    return name;
  };

  const showFilterName = (value: string, type: string) => {
    switch (type) {
      case "market":
        return filterMarkets(value);
        break;
      case "leads":
        return filterLeads(value);
        break;
      case "clients":
        return filterClients(value);
        break;
      default:
        return value;
        break;
    }
  };

  // When clicked X in applied filters UI
  const handleFilterRemoveAndUpdate = (
    filterKey: string,
    valueToRemove: string
  ) => {
    const localData = JSON.parse(localStorage.getItem("savedFilter")!);

    const newValue: any = Object.entries(localData).find(
      (item) => item[0] === filterKey
    );
    const updatedValue = newValue?.[1]
      ?.split(",")
      .filter((item: any) => item !== valueToRemove)
      .join(",");
    const data = {
      ...localData,
      [filterKey]: updatedValue,
    };
    if (filterKey === "date") {
      setDateRange({
        from: undefined,
        to: undefined,
      });
    }
    setFilterStates(data);
    setFilterSaved(data);
    localStorage.setItem("savedFilter", JSON.stringify(data));
  };

  useEffect(() => {
    if (selectedLeads?.length > 0) {
      const leadsIds = selectedLeads.map((lead) => lead.id).join(",");
      setFilterStates((prev) => ({ ...prev, leads: leadsIds }));
    }
  }, [selectedLeads]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFilters = window.localStorage.getItem("savedFilter");
      if (savedFilters) {
        setFilterStates(JSON.parse(savedFilters));
        setFilterSaved(JSON.parse(savedFilters));
      }
    }
  }, []);

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
    selectedLeads,
    setSelectedLeads,

    handleDateRangeChange,
    showFilterName,
    handleFilterRemoveAndUpdate,
  };
};

export default useProjectFilter;
