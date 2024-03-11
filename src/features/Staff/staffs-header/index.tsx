import useStaffDetail from "@/hooks/staff/useStaffDetail.hook";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const StaffsHeader = () => {
  const router = useRouter();

  const { staffDetails, staffDetailsLoading } = useStaffDetail();
  return (
    <div className="flex justify-between px-8 py-6 bg-white border-b border-b-slate-100">
      <div className="flex items-start gap-4">
        <Button
          onClick={() => router.back()}
          variant={"table"}
          className="h-auto gap-2 p-2.5"
          size={"sm"}
        >
          <ChevronLeft size={16} />
        </Button>
        <div>
          {staffDetailsLoading ? (
            <>
              <Skeleton className="w-20 h-3 mb-4" />
              <Skeleton className="w-10 h-3 mb-5" />
            </>
          ) : (
            <>
              <div className="flex justify-start">
                <h4 className="mb-1 text-2xl font-medium text-zinc-700 me-3">
                  {staffDetails?.data?.fullname}
                </h4>
                <Button
                  onClick={() =>
                    router.push(`/staffs/${router?.query?.username}/profile`)
                  }
                  size={"sm"}
                  variant={"white"}
                >
                  View Profile
                </Button>
              </div>
              <p className="text-base font-normal text-zinc-500">
                {staffDetails?.data?.role?.name}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffsHeader;
