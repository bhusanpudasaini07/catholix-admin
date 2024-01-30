import { Input } from "@/shared/components/ui/input";
import React from "react";

const EditInvoiceShipTo = ({ apiData, setApiData }: any) => {
  const { ship_to } = apiData?.result;
  const handleInputChange = (key: string, value: string) => {
    setApiData((prevState: any) => ({
      ...prevState,
      result: {
        ...prevState.result,
        ship_to: {
          ...prevState.result.ship_to,
          [key]: value,
        },
      },
    }));
  };
  return (
    <div>
      <h5 className="text-xl font-bold">Ship to</h5>
      <div className="mb-4">
        <div className="text-color text-sm flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">Name</p>
          <span className="text-gray-270 text-sm leading-4 -mt-1">:</span>

          <Input
            value={ship_to?.company_name}
            className="w-full text-color mb-1 border-transparent hover:border-gray-270 text-end"
            onChange={(e) => handleInputChange("company_name", e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="text-color text-sm flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">
            Address
          </p>
          <span className="text-gray-270 text-sm leading-4 -mt-1">:</span>

          <Input
            value={ship_to?.address}
            placeholder="Address"
            className="w-full text-color mb-1 border-transparent hover:border-gray-270 text-end"
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="text-color text-sm flex items-center gap-2">
          <p className="text-xs text-gray-270 uppercase min-w-[80px]">
            City/Zip
          </p>
          <span className="text-gray-270 text-sm leading-4 -mt-1">:</span>

          <Input
            value={ship_to?.city}
            placeholder="City"
            className="w-full text-color mb-1 border-transparent hover:border-gray-270 text-end"
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
          <Input
            value={ship_to?.zip}
            placeholder="Zip"
            className="w-full text-color mb-1 border-transparent hover:border-gray-270 text-end"
            onChange={(e) => handleInputChange("zip", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditInvoiceShipTo;
