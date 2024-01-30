import { Input } from "@/shared/components/ui/input";
import React from "react";

const EditInvoiceClient = ({ apiData, setApiData }: any) => {
  const handleInputChange = (key: string, value: string) => {
    setApiData((prevState: any) => ({
      ...prevState,
      result: {
        ...prevState.result,
        client: {
          ...prevState.result.client,
          [key]: value,
        },
      },
    }));
  };

  return (
    <div>
      <h5 className="text-xl font-bold">Client</h5>
      <div className="mb-4">
        <div className="text-color mb-1 flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">Name</p>
          <span className="text-gray-270 text-sm leading-4 -mt-1">:</span>
          <Input
            value={
              apiData?.result?.client?.company_name
                ? apiData?.result?.client?.company_name
                : apiData?.result?.client?.customer_name
                ? apiData?.result?.client?.customer_name
                : apiData?.result?.client?.name
            }
            className="border-transparent hover:border-gray-270"
            placeholder="Client Name"
            onChange={(e) =>
              handleInputChange(
                `${
                  apiData?.result?.client?.company_name
                    ? "company_name"
                    : apiData?.result?.client?.customer_name
                    ? "customer_name"
                    : "name"
                }`,
                e.target.value
              )
            }
          />
        </div>
        <div className="text-color text-sm flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">
            Address
          </p>
          <span className="text-gray-270 text-sm leading-4 -mt-1">:</span>

          <Input
            value={apiData?.result?.client?.address}
            placeholder="Client Address"
            className="border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="text-color text-sm flex items-center gap-2 mb-1">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">
            City / Zip
          </p>
          <span className="text-gray-270 text-sm leading-4 -mt-1">:</span>
          <Input
            value={apiData?.result?.client?.city}
            placeholder="Client City"
            className="w-full border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
          <Input
            value={apiData?.result?.client?.zip}
            placeholder="Client zip"
            className=" w-full border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("zip", e.target.value)}
          />
        </div>
      </div>
      {apiData?.result?.client?.tax_id && (
        <div className="text-color text-sm mb-1 flex items-center gap-2 ">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">
            TAX ID{" "}
          </p>
          <span className="text-gray-270 text-sm leading-4 -mt-1">:</span>

          <Input
            value={apiData?.result?.client?.tax_id}
            placeholder="Client tax id"
            className="border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("tax_id", e.target.value)}
          />
        </div>
      )}
      {apiData?.result?.client?.iban && (
        <div className="text-color text-sm mb-1 flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">IBAN</p>
          <span className="text-gray-270 text-sm leading-4 -mt-1">:</span>

          <Input
            value={apiData?.result?.client?.iban}
            placeholder="Client iban"
            className="border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("iban", e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default EditInvoiceClient;
