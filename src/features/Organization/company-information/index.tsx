import React from "react";

interface IProps {
  suite: string;
  contactName: string;
}
const CompanyInformation = ({ suite, contactName }: IProps) => {
  return (
    <div>
      <h5 className="text-2xl font-medium text-color mb-3">
        Company Information
      </h5>
      <div>
        <div className="flex items-start gap-16 mb-2">
          <p className="text-sm leading-8 text-gray-260 min-w-[101px]">
            Suite:
          </p>
          <p className="font-medium text-sm leading-8 text-color">
            {suite || "-"}
          </p>
        </div>
        <div className="flex items-start gap-16">
          <p className="text-sm leading-8 text-gray-260 min-w-[101px]">
            Contact Name:
          </p>
          <p className="font-medium text-sm leading-8 text-color">
            {contactName || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
