import { Input } from "@/shared/components/ui/input";
import React from "react";

interface IProps {
  apiData: any;
  setApiData: ({}) => void;
  isShipToValid: () => boolean;
}

const EditInvoiceApiData = ({ apiData, setApiData, isShipToValid }: IProps) => {
  const handleInputChange = (key: string, value: string) => {
    setApiData((prevState: any) => ({
      ...prevState,
      result: {
        ...prevState.result,
        invoice: {
          ...prevState.result.invoice,
          [key]: value,
        },
      },
    }));
  };
  return (
    <div
      className={
        isShipToValid()
          ? "[&>*]:text-end [&>*>input]:text-end [&>div]:justify-end"
          : ""
      }
    >
      <div className="text-xl flex items-center font-medium mb- gap-2 text-black">
        <p className="whitespace-nowrap min-w-[100px]">Invoice no</p>
        <span>:</span>
        <Input
          value={apiData?.result?.invoice?.invoice_number}
          className=" w-40 text-xl font-bold border-transparent hover:border-gray-270"
          onChange={(e) => handleInputChange("invoice_number", e.target.value)}
        />
      </div>
      <div className="text-sm flex items-center gap-2">
        <p className="whitespace-nowrap min-w-[100px]">Invoice Date </p>{" "}
        <span>:</span>
        <Input
          value={apiData?.result?.invoice?.invoice_date}
          className="w-40 border-transparent hover:border-gray-270"
          onChange={(e) => handleInputChange("invoice_date", e.target.value)}
        />
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                " text-left flex items-center gap-4 border-transparent hover:border-gray-300 text-sm text-gray-270 font-medium",
                !apiData?.result?.invoice?.invoice_date &&
                  "text-muted-foreground"
              )}
            >
              {apiData?.result?.invoice?.invoice_date ? (
                format(new Date(apiData?.result?.invoice?.invoice_date), "PPP")
              ) : (
                <span>Invoice Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              defaultMonth={new Date(apiData?.result?.invoice?.invoice_date)}
              selected={new Date(apiData?.result?.invoice?.invoice_date)}
              onSelect={(date: any) =>
                handleInputChange(
                  "invoice_date",
                  format(new Date(date), "MM/dd/yyyy")
                )
              }
            />
          </PopoverContent>
        </Popover> */}
      </div>
      {apiData?.result?.invoice?.due_date && (
        <div className="text-sm flex items-center gap-2">
          <p className="whitespace-nowrap min-w-[100px]">Due Date</p>
          <span>:</span>

          <Input
            value={apiData?.result?.invoice?.due_date}
            className="w-40 border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("due_date", e.target.value)}
          />
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " text-left flex items-center gap-4 border-transparent hover:border-gray-300 text-sm text-gray-270 font-medium",
                  !apiData?.result?.invoice?.due_date && "text-muted-foreground"
                )}
              >
                {apiData?.result?.invoice?.due_date ? (
                  format(new Date(apiData?.result?.invoice?.due_date), "PPP")
                ) : (
                  <span>Invoice Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                defaultMonth={new Date(apiData?.result?.invoice?.due_date)}
                selected={new Date(apiData?.result?.invoice?.due_date)}
                onSelect={(date: any) =>
                  handleInputChange(
                    "due_date",
                    format(new Date(date), "MM/dd/yyyy")
                  )
                }
              />
            </PopoverContent>
          </Popover> */}
        </div>
      )}
      {apiData?.result?.invoice?.order_number && (
        <div className="text-color text-sm flex items-center gap-2">
          <p className="whitespace-nowrap min-w-[100px]">Order Number</p>
          <span>:</span>

          <Input
            value={apiData?.result?.invoice?.order_number}
            className="w-40 border-transparent hover:border-gray-270"
            onChange={(e) => handleInputChange("order_number", e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default EditInvoiceApiData;
