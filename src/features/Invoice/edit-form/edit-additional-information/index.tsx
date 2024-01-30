import { Input } from "@/shared/components/ui/input";
import React from "react";

const EditInvoiceAdditionalInfo = ({ apiData, setApiData }: any) => {
  const handleInputChange = (
    key: string,
    value: string,
    parentKey?: string
  ) => {
    setApiData((prevState: any) => {
      let updatedExtraInfo = { ...prevState.result.extra_info };
      if (parentKey) {
        updatedExtraInfo[parentKey] = {
          ...updatedExtraInfo[parentKey],
          [key]: value,
        };
      } else {
        updatedExtraInfo[key] = value;
      }
      return {
        ...prevState,
        result: {
          ...prevState.result,
          extra_info: updatedExtraInfo,
        },
      };
    });
  };

  return (
    <div className="border p-4 rounded-md mb-4">
      <h4 className="text-center font-bold mb-3">Additional Information</h4>
      <div className="mb-3">
        {apiData?.result?.extra_info &&
          Object.entries(apiData?.result?.extra_info).map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              return (
                <div key={key}>
                  <h5 className="text-color font-semibold mb-2">
                    {key
                      .replace(/_/g, " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h5>
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div
                      className="text-sm flex items-center gap-3"
                      key={subKey}
                    >
                      <p className="whitespace-nowrap w-[200px]">
                        {subKey
                          .replace(/_/g, " ")
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}{" "}
                      </p>
                      :
                      <Input
                        value={subValue}
                        placeholder={subKey
                          .replace(/_/g, " ")
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                        className="border-transparent hover:border-gray-270"
                        onChange={(e) =>
                          handleInputChange(subKey, e.target.value, key)
                        }
                      />
                    </div>
                  ))}
                </div>
              );
            } else {
              return (
                <div
                  className="text-color text-sm mb-1 flex items-center gap-2"
                  key={key}
                >
                  <p className="whitespace-nowrap w-[200px]">
                    {key
                      .replace(/_/g, " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}{" "}
                  </p>{" "}
                  :
                  <Input
                    value={value?.toString()}
                    placeholder={key
                      .replace(/_/g, " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                    className=" border-transparent hover:border-gray-270"
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default EditInvoiceAdditionalInfo;
