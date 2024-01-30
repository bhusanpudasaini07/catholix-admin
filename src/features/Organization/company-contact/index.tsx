import React from "react";
import Image from "next/image";

import { Button } from "@/shared/components/ui/button";
import { Mail, MapPin, Mobile } from "@/shared/lib/image-config";
import { IOrganization } from "@/interface/organization-interface";

interface IProps {
  organizationData: IOrganization;
}

const CompanyContact = ({ organizationData }: IProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center flex-1 gap-4">
        <Button className="rounded-full min-w-[43px] h-[43px] p-0">
          <Image src={Mobile} width={12} height={20} alt="Icon" />
        </Button>
        <div>
          <p className="text-sm text-gray-260 leading-8">Mobile No.</p>
          <p className="text-sm font-medium text-color break-all">
            {organizationData?.contact || "-"}
          </p>
        </div>
      </div>
      <div className="flex items-center flex-1 gap-4">
        <Button className="rounded-full min-w-[43px] h-[43px] p-0">
          <Image src={Mail} width={21} height={15} alt="Icon" />
        </Button>
        <div>
          <p className="text-sm text-gray-260 leading-8">Email</p>
          <p className="text-sm font-medium text-color break-all">
            {organizationData?.email}
          </p>
        </div>
      </div>
      <div className="flex items-center flex-1 gap-4">
        <Button className="rounded-full min-w-[43px] h-[43px] p-0">
          <Image src={MapPin} width={18} height={22} alt="Icon" />
        </Button>
        <div>
          <p className="text-sm text-gray-260 leading-8">Current Address</p>
          <p className="text-sm font-medium text-color break-all">
            {organizationData?.business_address || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyContact;
