import React from "react";

const UploadAdditionalInformation = ({ extractData }: any) => {
  const extraInfo = extractData?.result?.extra_info;
  const isEmpty = (value: any) => {
    if (typeof value === "object" && value !== null) {
      return Object.keys(value).length === 0;
    }
  };
  return (
    <div className="border p-4 rounded-md mb-4">
      <h4 className="text-center font-bold mb-3">Additional Information</h4>
      <div className="mb-3">
        {extraInfo &&
          Object.entries(extraInfo).map(([key, value]) => {
            if (isEmpty(value)) {
              return null;
            } else {
              if (typeof value === "object" && value !== null) {
                return (
                  <div key={key} className="mt-2">
                    <h5 className="text-color font-semibold mb-2">
                      {key
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </h5>
                    {Object.entries(value).map(([subKey, subValue]) => {
                      return (
                        <div
                          className="text-sm flex items-start gap-2"
                          key={subKey}
                        >
                          <p className="min-w-[180px]">
                            {subKey
                              .replace(/_/g, " ")
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </p>{" "}
                          :<p className="ml-1">{subValue}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              } else {
                return (
                  <div
                    className="text-color text-sm mb-1 flex items-start gap-2"
                    key={key}
                  >
                    <span className="whitespace-nowrap min-w-[180px]">
                      {key
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}{" "}
                    </span>{" "}
                    :<p className="ml-1"> {value?.toString()}</p>
                  </div>
                );
              }
            }
          })}
      </div>
    </div>
  );
};

export default UploadAdditionalInformation;
