import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";
import { CircleDot, UserCircle2, Warehouse } from "lucide-react";
import React from "react";

const RPAllocation = () => {
  const rpData = [
    // Total RP
    {
      title: "Total RP",
      data: "21,332.49",
      icon: <CircleDot size={24} />,
      color: "text-green-500",
      titleColor: "text-green-700",
    },
    // Client RP
    {
      title: "Client RP",
      data: "21,332.49",
      icon: <UserCircle2 size={24} />,
      color: "text-blue-500",
      titleColor: "text-blue-700",
    },
    // IN-House RP
    {
      title: "In-House RP",
      data: "21,332.49",
      icon: <Warehouse size={24} />,
      color: "text-orange-500",
      titleColor: "text-orange-700",
    },
  ];
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-9">
          <p className="text-lg font-medium text-zinc-700">
            RP Allocation (Total)
          </p>
          <Button variant={"white"} size={"sm"}>
            More Details
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {rpData?.map((rp) => (
            <div
              className={cn("flex items-baseline gap-3", rp?.color)}
              key={rp?.title}
            >
              {rp?.icon}
              <div>
                <p className="mb-1 text-2xl font-semibold">{rp?.data}</p>
                <p className={cn(rp?.titleColor, "text-sm")}>{rp.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RPAllocation;
