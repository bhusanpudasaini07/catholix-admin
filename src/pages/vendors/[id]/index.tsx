import React, { useEffect } from "react";
import MainLayout from "@/shared/main-layout";
import { NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";

import VendorApprovers from "@/features/Vendors/details/vendor-approver";
import VendorsInformation from "@/features/Vendors/details/vendor-info";
import VendorsProjects from "@/features/Vendors/details/vendor-projects";
import { ChevronLeft } from "lucide-react";
import { useQuery } from "react-query";
import { getVendorDetails } from "@/services/vendor/vendor-service";
import { IVendorDetails } from "@/interface/vendor-interface";
import VendorsBankDetails from "@/features/Vendors/details/vendor-bank-details";

interface IVendorDetailProps {
  data: IVendorDetails;
}

const VendorDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: vendorDetail, isLoading } = useQuery<IVendorDetailProps>({
    queryKey: ["vendorDetail", id],
    queryFn: async () => {
      if (id) {
        const response = await getVendorDetails(id);
        return response;
      }
    },
  });

  const bankValueEmpty = vendorDetail?.data?.bank_details?.every((bank) =>
    Object.values(bank).every((value) => value === null || value === "")
  );

  return (
    <div className="flex flex-col max-w-4xl gap-6 m-auto">
      <div className="flex items-center gap-6">
        <Link
          href={"/vendors"}
          className="flex items-center gap-2 text-primary whitespace-nowrap"
        >
          <ChevronLeft />
          Back
        </Link>
        <h3 className="text-4xl font-bold text-color break-all">
          {vendorDetail?.data?.name}
        </h3>
      </div>

      <VendorsInformation vendorDetail={vendorDetail?.data!} />
      {vendorDetail?.data &&
        vendorDetail?.data?.bank_details?.length > 0! &&
        !bankValueEmpty && (
          <VendorsBankDetails vendorDetail={vendorDetail?.data} />
        )}
      {/* <VendorApprovers vendorDetail={vendorDetail?.data} /> */}
    </div>
  );
};

export default VendorDetails;

VendorDetails.getLayout = (page) => {
  return <MainLayout title="Vendors">{page}</MainLayout>;
};
