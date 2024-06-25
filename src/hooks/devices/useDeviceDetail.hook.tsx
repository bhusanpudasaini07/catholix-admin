import { useState } from "react";
import { DateRange } from "react-day-picker";

const useDeviceDetail = () => {
  // States
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const resetHandler = () => {
    setSearchText("");
    setSearchTrigger(!searchTrigger);
  };
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };
  return {
    // States
    searchText,
    setSearchText,
    perPage,
    setPerPage,
    page,
    setPage,
    searchTrigger,
    setSearchTrigger,
    dateRange,
    setDateRange,

    // Functions
    searchTextHandler,
    resetHandler,
    perPageHandler,
    pageChangeHandler,
    searchTriggerHandler,
  };
};

export default useDeviceDetail;
