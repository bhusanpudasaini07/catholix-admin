import React from "react";
import { IInvoiceDetails } from "@/interface/invoice-interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
interface IInvoiceDetailProps {
  invoiceDetail: IInvoiceDetails;
}

const InvoiceTable = ({ invoiceDetail }: IInvoiceDetailProps) => {
  /**
   * generates the table in a order
   */
  const generateOrderedKeys = (item: any) => {
    const predefinedKeys = [
      "number",
      "description",
      "quantity",
      "unit_price",
      "amount",
    ];
    const otherKeys = Object.keys(item).filter(
      (key) => !predefinedKeys.includes(key) && key !== "isNew"
    );
    return [...predefinedKeys.slice(0, 4), ...otherKeys, predefinedKeys[4]];
  };

  return (
    <div className="border">
      <Table>
        <TableHeader className="bg-purple-60 text-white">
          <TableRow>
            {invoiceDetail?.details?.result?.items &&
              invoiceDetail?.details?.result?.items[0] &&
              generateOrderedKeys(invoiceDetail?.details?.result?.items[0]).map(
                (key, index) => (
                  <TableHead
                    key={index}
                    className="text-white border border-purple-60 border-r-white [&:last-child]:border-r-purple-60"
                  >
                    {key === "number"
                      ? "SN."
                      : key.split("_").join(" ").toUpperCase()}
                  </TableHead>
                )
              )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceDetail?.details?.result?.items?.map(
            (item: any, index: number) => (
              <TableRow key={index}>
                {generateOrderedKeys(item).map((key) => (
                  <TableCell
                    key={key}
                    className={`
                      ${
                        key === "number" || key === "quantity"
                          ? `min-w-[50px] max-w-[50px]`
                          : key === "description"
                          ? "min-w-[300px] max-w-[350px]"
                          : "min-w-[200px] max-w-[200px]"
                      }
                      border-r [&:last-child]:border-0
                    `}
                  >
                    {item[key]}
                  </TableCell>
                ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
