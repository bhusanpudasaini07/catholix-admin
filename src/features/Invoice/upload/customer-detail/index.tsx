import React from "react";

const UploadCustomerDetail = ({ extractData }: any) => {
  return (
    <div className="border p-4 rounded-md">
      <h4 className="text-center font-bold mb-3">Customer Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {extractData?.result?.customer_details &&
          Object.entries(extractData?.result?.customer_details).map(
            ([key, value]) => {
              if (value != "") {
                return (
                  <div
                    className="text-sm text-color mb-1 flex items-start gap-2"
                    key={key}
                  >
                    <p className="w-[120px]">
                      {" "}
                      {key
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}{" "}
                    </p>
                    <p>: {value?.toString()}</p>
                  </div>
                );
              }
            }
          )}
        {/* <div>
          <div className="text-sm text-color mb-1 flex items-start gap-2">
            <p className="w-[120px]">Customer Id</p>
            <p className="font-bold">
              : {extractData?.result?.customer_details?.customer_id}
            </p>
          </div>
          <div className="text-sm text-color mb-1 flex items-start gap-2">
            <p className="w-[120px]">Customer PO </p>
            <p>: {extractData?.result?.customer_details?.customer_po}</p>
          </div>
          <div className="text-sm text-color mb-1 flex items-start gap-2">
            <p className="w-[120px]">Sales Rep ID </p>
            <p>: {extractData?.result?.customer_details?.sales_rep_id}</p>
          </div>
          <div className="text-sm text-color mb-1 flex items-start gap-2">
            <p className="w-[120px]">Ship Date </p>
            <p>: {extractData?.result?.customer_details?.ship_date}</p>
          </div>
        </div>
        <div>
          <div className="text-sm text-color mb-1 flex items-start gap-2">
            <p className="w-[120px]">Shipping Method</p>
            <p>: {extractData?.result?.customer_details?.shipping_method}</p>
          </div>
          <div className="text-sm text-color mb-1 flex items-start gap-2">
            <p className="w-[120px]"> Payment Terms</p>
            <p>: {extractData?.result?.customer_details?.payment_terms}</p>
          </div>
          <div className="text-sm text-color mb-1 flex items-start gap-2">
            <p className="w-[120px]"> Due Date</p>
            <p>: {extractData?.result?.customer_details?.due_date}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UploadCustomerDetail;
