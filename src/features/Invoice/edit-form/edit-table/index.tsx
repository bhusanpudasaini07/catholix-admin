import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface IProps {
  apiData: any;
  setApiData: (arg: any) => void;
}

const InvoiceEditTable = ({ apiData, setApiData }: IProps) => {
  // STATES
  const [items, setItems] = useState<any>();
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  //   FUNCTIONS
  /**
   * Updates the value according to index, it's key and the new value.
   */
  const handleInputChange = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

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
  // Generates new row of dynamic values
  const generateNewRow = () => {
    // Assuming items[0] has all the keys
    const keys = Object.keys(items[0]);
    let newRow: any = { isNew: true };

    keys.forEach((key) => {
      if (key !== "isNew") {
        newRow[key] = "";
      }
    });

    return newRow;
  };

  /**
   * Adds another row to the table.
   */
  const handleAddRow = () => {
    setItems([...items, generateNewRow()]);
  };
  /*
   * delete row by index if it's new
   */
  const handleDeleteRow = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  //   EFFECTS
  useEffect(() => {
    if (!isInitialDataLoaded && apiData?.result?.items) {
      setItems(apiData?.result?.items);
      setIsInitialDataLoaded(true);
    }
  }, [apiData, isInitialDataLoaded]);

  useEffect(() => {
    if (items) {
      setApiData((prevApiData: any) => ({
        ...prevApiData,
        result: {
          ...prevApiData?.result,
          items: items,
        },
      }));
    }
  }, [items]);
  return (
    <div>
      <Table>
        <TableHeader className="bg-purple-60 text-white">
          <TableRow>
            {items &&
              items[0] &&
              generateOrderedKeys(items[0]).map((key, index) => (
                <TableHead
                  key={index}
                  className="text-white border border-purple-60 border-r-white [&:last-child]:border-r-purple-60"
                >
                  {key === "number"
                    ? "SN."
                    : key.split("_").join(" ").toUpperCase()}
                </TableHead>
              ))}
            {items?.some((item: any) => item.isNew) && (
              <TableHead className="text-white"> </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item: any, index: number) => (
            <TableRow key={index}>
              {generateOrderedKeys(item).map((key) => (
                <TableCell
                  key={key}
                  className={`
                      ${
                        key === "number" || key === "quantity"
                          ? `min-w-[100px] max-w-[100px]`
                          : key === "description"
                          ? "min-w-[300px] max-w-[350px]"
                          : "min-w-[200px] max-w-[200px]"
                      }
                      border-r [&:last-child]:border-0
                    `}
                >
                  <Input
                    placeholder={`Enter ${key.split("_").join(" ")}`}
                    className={`${
                      key === "number"
                        ? `w-full min-w-[70px] max-w-[70px]`
                        : " w-full"
                    } border-transparent hover:border-gray-300`}
                    value={item[key]}
                    onChange={(e) =>
                      handleInputChange(index, key, e.target.value)
                    }
                  />
                </TableCell>
              ))}
              {item.isNew && (
                <TableCell>
                  <Button
                    variant={"ghost"}
                    type="button"
                    className="text-center text-destructive p-0 hover:bg-transparent h-auto text-sm"
                    onClick={() => handleDeleteRow(index)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center px-6 py-5 border-y">
        <Button
          variant={"ghost"}
          type="button"
          className="text-center  text-primary text-sm "
          onClick={handleAddRow}
        >
          <Plus /> Add new Item
        </Button>
      </div>
    </div>
  );
};

export default InvoiceEditTable;
