import { Input } from "@/shared/components/ui/input";
import React, { ChangeEvent } from "react";

interface IProps {
  apiData: any;
  setApiData: ({}) => void;
  isShipToValid: () => boolean;
}

const EditInvoiceVendor = ({ apiData, setApiData, isShipToValid }: IProps) => {
  const handleInputChange = (key: string, value: string) => {
    setApiData((prevState: any) => ({
      ...prevState,
      result: {
        ...prevState.result,
        vendor: {
          ...prevState.result.vendor,
          [key]: value,
        },
      },
    }));
  };

  return (
    <div className="">
      <h5 className="text-xl font-bold">Vendor</h5>
      <div className={`mb-4 ${!isShipToValid() && "[&>div>input]:text-end"}`}>
        <div className="text-color mb-1 flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">Name</p>
          <span className="text-gray-270 leading-4 text-sm -mt-1">:</span>

          <Input
            value={apiData?.result?.vendor?.name}
            placeholder="Vendor name"
            className="w-full text-color mb-1 border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="text-color mb-1 flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">
            Address
          </p>
          <span className="text-gray-270 leading-4 text-sm -mt-1">:</span>

          <Input
            value={apiData?.result?.vendor?.address}
            placeholder="Vendor address"
            className="w-full text-color mb-1 border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="text-color mb-1 flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">
            City/Zip
          </p>
          <span className="text-gray-270 leading-4 text-sm -mt-1">:</span>

          <Input
            value={apiData?.result?.vendor?.city}
            placeholder="Vendor city"
            className="w-full text-color mb-1 border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
          <Input
            value={apiData?.result?.vendor?.zip}
            placeholder="Vendor zip"
            className="w-full text-color mb-1 border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("zip", e.target.value)}
          />
        </div>
        {apiData?.result?.vendor?.voice !== undefined && (
          <div className="text-color mb-1 flex items-center gap-2 ">
            <span className="text-xs text-gray-270 uppercase min-w-[80px] whitespace-nowrap">
              {" "}
              Contact
            </span>
            <span className="text-gray-270 leading-4 text-sm -mt-1">:</span>

            <Input
              value={apiData?.result?.vendor?.voice}
              placeholder="Vendor Contact"
              className="w-full text-color mb-1 border-transparent hover:border-gray-270"
              onChange={(e) => handleInputChange("voice", e.target.value)}
            />
          </div>
        )}
        {apiData?.result?.vendor?.fax !== undefined && (
          <div className="text-color mb-1 flex items-center gap-2">
            <span className="text-xs text-gray-270 uppercase min-w-[80px] whitespace-nowrap">
              {" "}
              Fax
            </span>
            <span className="text-gray-270 leading-4 text-sm -mt-1">:</span>

            <Input
              value={apiData?.result?.vendor?.fax}
              placeholder="Vendor Fax"
              className="w-full text-color mb-1 border-transparent hover:border-gray-270"
              onChange={(e) => handleInputChange("fax", e.target.value)}
            />
          </div>
        )}
        {apiData?.result?.vendor?.email !== undefined && (
          <div className="text-color mb-1 flex items-center gap-2">
            <span className="text-xs text-gray-270 uppercase min-w-[80px] whitespace-nowrap">
              {" "}
              Email
            </span>
            <span className="text-gray-270 leading-4 text-sm -mt-1">:</span>

            <Input
              value={apiData?.result?.vendor?.email}
              placeholder="Vendor Email"
              className="w-full text-color mb-1 border-transparent hover:border-gray-270"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        )}
        {apiData?.result?.vendor?.tax_id !== undefined && (
          <div className="text-color mb-1 flex items-center gap-2">
            <span className="text-xs text-gray-270 uppercase min-w-[80px] whitespace-nowrap">
              {" "}
              Tax ID
            </span>
            <span className="text-gray-270 leading-4 text-sm -mt-1">:</span>

            <Input
              value={apiData?.result?.vendor?.tax_id}
              placeholder="Vendor Tax ID"
              className="w-full text-color mb-1 border-transparent hover:border-gray-270"
              onChange={(e) => handleInputChange("tax_id", e.target.value)}
            />
          </div>
        )}
        {apiData?.result?.vendor?.iban !== undefined && (
          <div className="text-color mb-1 flex items-center gap-2">
            <span className="text-xs text-gray-270 uppercase min-w-[80px] whitespace-nowrap">
              {" "}
              IBAN
            </span>
            <span className="text-gray-270 leading-4 text-sm -mt-1">:</span>

            <Input
              placeholder="Vendor IBAN"
              value={apiData?.result?.vendor?.iban}
              className="w-full text-color mb-1 border-transparent hover:border-gray-270"
              onChange={(e) => handleInputChange("iban", e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditInvoiceVendor;
