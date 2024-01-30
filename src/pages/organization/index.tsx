import React from "react";
import { NextPageWithLayout } from "../_app";
import Link from "next/link";

import MainLayout from "@/shared/main-layout";

import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { User } from "lucide-react";

import CompanyInformation from "@/features/Organization/company-information";
import CompanyLegalInformation from "@/features/Organization/company-legal-information";
import CompanyContact from "@/features/Organization/company-contact";
import { IOrganization } from "@/interface/organization-interface";
import { useOrgStore } from "@/store/organization-store";

export interface IOrganizationData {
  data: IOrganization;
}

const Organization: NextPageWithLayout = () => {
  const { orgData } = useOrgStore();

  return (
    <div className="max-w-[1023px] m-auto">
      <Card className="px-12 py-10">
        <CardContent className="p-0 flex flex-col gap-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Avatar className="bg-primary w-[80px] h-[80px]">
                <AvatarImage src={orgData.logo} alt="Company Logo" />
                <AvatarFallback>
                  <User width={100} className="text-white" />
                </AvatarFallback>
              </Avatar>
              <p className="text-4xl font-bold text-color break-all">
                {orgData.name}
              </p>
            </div>
            <Link
              href={`/organization/edit`}
              className="w-[135px] h-auto leading-none text-center py-3.5 text-sm rounded-lg inline bg-white border border-purple-60 text-purple-60  hover:bg-purple-60 hover:text-white"
            >
              Edit
            </Link>
          </div>

          {/* Company Information */}
          <CompanyInformation
            suite={orgData.suite}
            contactName={orgData?.contact_person_name}
          />

          {/* Company Legal Information */}
          <CompanyLegalInformation organizationData={orgData} />

          {/* Contact Info */}
          <CompanyContact organizationData={orgData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Organization;

Organization.getLayout = (page) => {
  return <MainLayout title="Organization">{page}</MainLayout>;
};
