import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import moment from "moment-timezone";

const DashboardTime = () => {
  const [adelaideTime, setAdelaideTime] = useState(moment().tz("Australia/Adelaide"));
  //   For time change
  useEffect(() => {
    const interval = setInterval(() => {
      setAdelaideTime(moment().tz("Australia/Adelaide"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-auto shadow-sm flex border border-primary flex-col justify-center w-[150px] ">
      <CardContent className="p-3 xl:py-4 xl:px-5">
        <p className="text-sm text-nowrap text-zinc-500">
          {adelaideTime.format("ll")}
        </p>
        <p className="text-lg font-semibold text-zinc-700 2xl:text-2xl">
          {adelaideTime.format("h:mm A")}
        </p>
        <p className="text-sm font-medium text-zinc-500">(GMT+1)</p>
      </CardContent>
    </Card>
  );
};

export default DashboardTime;
