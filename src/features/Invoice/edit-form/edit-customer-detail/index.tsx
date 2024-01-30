import { Input } from "@/shared/components/ui/input";
import React from "react";

const EditInvoiceCustomerDetail = ({ apiData, setApiData }: any) => {
  const handleInputChange = (key: string, value: string) => {
    setApiData((prevState: any) => ({
      ...prevState,
      result: {
        ...prevState.result,
        customer_details: {
          ...prevState.result.customer_details,
          [key]: value,
        },
      },
    }));
  };
  return (
    <div className="border p-4 rounded-md">
      <h4 className="text-center font-bold mb-3">Customer Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {apiData?.result?.customer_details &&
          Object.entries(apiData?.result?.customer_details).map(
            ([key, value]) => {
              if (value != "") {
                return (
                  <div
                    className="text-sm flex items-center gap-2 text-color mb-1"
                    key={key}
                  >
                    <span className="whitespace-nowrap w-[200px]">
                      {" "}
                      {key
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}{" "}
                    </span>
                    :{" "}
                    <Input
                      value={value?.toString()}
                      placeholder="Customer ID"
                      className=" border-transparent hover:border-gray-270"
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  </div>
                );
              }
            }
          )}
      </div>
    </div>
  );
};

export default EditInvoiceCustomerDetail;
