import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

const EstimationTable = () => {
  return (
    <Card className="mt-6">
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <p className="text-lg font-medium text-zinc-700">
              Task & Time Spent
            </p>
            <Button variant={"white"} size={"sm"}>
              Day View
            </Button>
          </div>
          <Button size={"md"}>
            <Plus /> <span>Add New Role</span>
          </Button>
        </div>

        <div>table content</div>
      </CardContent>
    </Card>
  );
};

export default EstimationTable;
