import { Input } from "@/shared/components/ui/input";
import React, { useState } from "react";

const EditTotal = ({ apiData, setApiData }: any) => {
  const handleInputChange = (key: string, value: string) => {
    setApiData((prevData: any) => ({
      ...prevData,
      result: {
        ...prevData?.result,
        summary: {
          ...prevData?.result?.summary,
          [key]: value,
        },
      },
    }));
  };

  return (
    <div>
      {apiData?.result?.summary &&
        Object.entries(apiData?.result?.summary).map(([key, value]) => {
          if (
            key !== "total" &&
            key !== "total_amount_in_words" &&
            key !== "amount_in_words" &&
            value != ""
          ) {
            return (
              <div className="flex items-center justify-end gap-3" key={key}>
                <p className="text-sm text-start text-black/50">
                  {key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                  :
                </p>
                <Input
                  className={`border-transparent hover:border-gray-300 ${
                    key === "total_amount_in_words" ? "w-60" : "w-40"
                  } text-end text-lg font-medium`}
                  value={value?.toString()}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            );
          }
        })}
      <div className="text-right my-4">
        <p className="text-sm text-black/50 mb-2">Invoice Total</p>
        <Input
          className="text-purple-60 text-base font-bold border-transparent placeholder:text-base placeholder:font-normal  hover:border-gray-300 w-60 ml-auto text-end"
          value={apiData?.result?.summary?.total}
          placeholder="Enter Total Amount"
          onChange={(e) => handleInputChange("total", e.target.value)}
        />
      </div>
      {apiData?.result?.summary &&
        Object.entries(apiData?.result?.summary).map(([key, value]) => {
          if (key == "total_amount_in_words" || key === "amount_in_words") {
            return (
              <div className="flex items-center border-t pt-2 gap-3" key={key}>
                <p className="text-sm text-start whitespace-nowrap text-black/50">
                  {key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                  :
                </p>
                <Input
                  className={`border-transparent hover:border-gray-300 w-full text-end text-lg font-medium`}
                  value={value?.toString()}
                  placeholder={`Enter  ${key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}`}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            );
          }
        })}
    </div>
  );
};

export default EditTotal;
