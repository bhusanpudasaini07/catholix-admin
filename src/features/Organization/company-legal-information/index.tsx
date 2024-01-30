import { IOrganization } from "@/interface/organization-interface";
import React from "react";

interface IProps {
  organizationData: IOrganization;
}

const CompanyLegalInformation = ({ organizationData }: IProps) => {
  return (
    <div>
      <h5 className="text-2xl font-medium text-color mb-3">
        Company Legal Information
      </h5>
      <div>
        <div className="flex items-start gap-16 mb-2">
          <p className="text-sm leading-8 text-gray-260 min-w-[156px]">
            Legal Business Name:
          </p>
          <p className="font-medium text-sm leading-8 text-color">
            {organizationData?.legal_business_name || "-"}
          </p>
        </div>
        <div className="flex items-start gap-16 mb-2">
          <p className="text-sm leading-8 text-gray-260 min-w-[156px]">
            Legal Business Address:
          </p>
          <p className="font-medium text-sm leading-8 text-color">
            {organizationData?.legal_business_address || "-"}
          </p>
        </div>
        <div className="flex items-start gap-16 mb-2">
          <p className="text-sm leading-8 text-gray-260 min-w-[156px]">
            TAX ID Type:
          </p>
          <p className="font-medium text-sm leading-8 text-color uppercase">
            {organizationData?.tax_id_type || "-"}
          </p>
        </div>
        <div className="flex items-start gap-16">
          <p className="text-sm leading-8 text-gray-260 min-w-[156px]">
            TAX ID Number:
          </p>
          <p className="font-medium text-sm leading-8 text-color">
            {organizationData?.tax_id_number || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyLegalInformation;
