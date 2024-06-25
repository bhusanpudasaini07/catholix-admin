import React from "react";
import { useMap } from "react-leaflet";
import { Button } from "../../ui/button";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

const ZoomControls = () => {
  const map = useMap();
  const zoomHandler = (type: "increase" | "decrease") => {
    if (type === "increase") {
      map.zoomIn();
    } else {
      map.zoomOut();
    }
  };

  return (
    <div className="flex absolute p-2 right-4 bottom-4 flex-col gap-2 bg-white rounded-lg shadow-lg z-[400] text-primary">
      <Button
        onClick={() => zoomHandler("increase")}
        variant={"ghost"}
        className="p-0 h-auto hover:bg-transparent"
        size={"sm"}
      >
        <Plus size={18} />
      </Button>
      <Separator />
      <Button
        variant={"ghost"}
        className="p-0 h-auto hover:bg-transparent"
        size={"sm"}
        onClick={() => zoomHandler("decrease")}
      >
        <Minus size={18} />
      </Button>
    </div>
  );
};

export default ZoomControls;
