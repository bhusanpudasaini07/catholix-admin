import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import { SearchIcon } from "@/shared/lib/image-config";

import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

import { useDebounce } from "@/hooks/debounce.hooks";
import InboxDetail from "@/features/Inbox/inbox-detail";
import { getInboxList } from "@/services/inbox/inbox-service";
import { IInbox } from "@/interface/inbox-interface";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

const Inbox: NextPageWithLayout = () => {
  const router = useRouter();
  const inboxScroll = useRef<HTMLDivElement>(null);

  const { id } = router?.query;
  // STATES
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 10;
  const [inboxList, setInboxList] = useState<IInbox | null>(null);

  // FUNCTIONS
  const debouncedSearchValue = useDebounce(searchValue, 300);

  // filter data sending name to api.
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPageNumber(1);
  };

  //   inbox List api req call
  const { data, isLoading } = useQuery<IInbox>({
    queryFn: () => getInboxList(searchValue, pageNumber, perPage),
    queryKey: ["inboxList", debouncedSearchValue, pageNumber, perPage],
    onSuccess: (newData) => {
      if (pageNumber === 1) {
        setInboxList(newData);
      } else {
        if (inboxList) {
          setInboxList((prevData: any) => ({
            ...newData,
            data: {
              ...newData.data,
              invoice_approvals: [
                ...prevData.data.invoice_approvals,
                ...newData.data.invoice_approvals,
              ],
            },
          }));
        } else {
          setInboxList(newData);
        }
      }
    },
  });

  /**
   * Setting inbox Data according to invoice_id
   */
  const inboxData: any = inboxList?.data?.invoice_approvals?.find(
    (inbox) => inbox?.invoice_id === id
  );

  const changeInboxId = (id: string) => {
    router.push(`/inbox?id=${id}`);
  };
  /**
   * On scroll pagination
   */
  const handleScroll = () => {
    const div = inboxScroll.current;
    if (div && div.scrollTop + div.clientHeight >= div.scrollHeight - 1) {
      if (pageNumber < inboxList?.pagination?.total_pages!) {
        const nextPage = pageNumber + 1;
        setPageNumber(nextPage);
      }
    }
  };

  // EFFECTS

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   if (inboxList?.data?.invoice_approvals) {
  //     //setting invoice id to populate it's data in details section
  //     router.push(
  //       `/inbox?id=${inboxList?.data?.invoice_approvals[0]?.invoice_id}`
  //     );
  //   }
  // }, [inboxList]);

  return (
    <div className="w-full flex">
      {/* Inbox Sidebar */}
      <div className=" border-r min-w-[370px] h-full">
        <div className="flex flex-col gap-4 mb-6 pr-4 ">
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-bold">Inbox</h2>
            {inboxList?.data?.invoice_approvals?.length! > 0 && (
              <Badge className="font-normal ">
                {inboxList?.data?.total_unapproved} Unapproved
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-end flex-1 gap-7">
            <div className="relative px-3.5 py-2.5 border-0 rounded-lg bg-gray-250 flex gap-2 flex-grow max-w-sm">
              <Button variant={"ghost"} className="h-auto p-0">
                <Image
                  src={SearchIcon}
                  width={24}
                  height={24}
                  quality={100}
                  alt="Search Icon"
                  className=""
                />
              </Button>
              <Input
                placeholder="Search"
                className="h-auto p-0 border-0 bg-gray-250 rounded-none "
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="flex flex-col gap-4 h-[calc(100vh-245px)] overflow-y-scroll pr-2"
          ref={inboxScroll}
          onScroll={handleScroll}
        >
          {inboxList?.data?.invoice_approvals?.length! > 0 ? (
            inboxList?.data?.invoice_approvals.map((inbox) => (
              <Card
                className={`p-4 ${
                  inbox?.invoice_id === id && "border-purple-60"
                } cursor-pointer`}
                key={inbox.invoice_id}
                onClick={() => changeInboxId(inbox?.invoice_id)}
              >
                <CardContent className="p-0">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <h5 className="text-color text-base font-semibold capitalize ">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="truncate max-w-[200px]">
                              {" "}
                              {inbox?.invoice_data?.vendor_name}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent align="start">
                            <p className="font-normal">
                              {" "}
                              {inbox?.invoice_data?.vendor_name}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </h5>
                      <p className="text-color text-xs ">
                        <span className="text-gray-260">Project</span>
                        <span> : {inbox?.invoice_data?.project_name}</span>
                      </p>
                      <p className="text-color text-xs">
                        <span className="text-gray-260">Invoice</span>
                        <span>
                          {" "}
                          : {inbox?.invoice_data?.invoice_number ?? "-"}
                        </span>
                      </p>
                      <p className="text-color text-xs">
                        <span className="text-gray-260">Status</span>
                        <span
                          className={`capitalize ${
                            inbox?.invoice_data?.status === "onprocess" &&
                            "text-[#0080DC]"
                          } ${
                            inbox?.invoice_data?.status === "approved" &&
                            "text-[#349D62]"
                          }
                          ${
                            inbox?.invoice_data?.status === "rejected" &&
                            "text-[#E94774]"
                          } `}
                        >
                          {" "}
                          : {inbox?.invoice_data?.status ?? "-"}
                        </span>
                      </p>
                    </div>
                    <div className="text-end flex flex-col gap-1">
                      <p className="uppercase text-gray-270  text-xs font-semibold">
                        Amount Due
                      </p>
                      <h4 className="text-2xl text-color font-extrabold leading-8">
                        {inbox?.invoice_data?.total_amount ?? "N/A"}
                      </h4>
                      <p className="uppercase text-gray-270 text-xs font-semibold">
                        {inbox?.invoice_data?.due_date
                          ? format(
                              new Date(inbox?.invoice_data?.due_date),
                              "PPP"
                            )
                          : "-"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-sm text-color text-center text-gray-270">
              No inbox messages.
            </div>
          )}
        </div>
      </div>

      {/* Inbox Detail */}
      {id && inboxList?.data?.invoice_approvals?.length! > 0 ? (
        <InboxDetail
          setInboxList={setInboxList}
          setPageNumber={setPageNumber}
          inboxData={inboxData}
          invoiceId={id}
        />
      ) : (
        <div className="flex-grow p-4 text-gray-270">No inbox.</div>
      )}
    </div>
  );
};

export default Inbox;

Inbox.getLayout = (page) => {
  return <MainLayout title="Inbox">{page}</MainLayout>;
};
