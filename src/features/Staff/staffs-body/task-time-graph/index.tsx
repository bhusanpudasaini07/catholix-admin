import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import StaffTimeGraph from "./staff-time-graph";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { BarChart2, BarChart3 } from "lucide-react";

const TaskAndTimeGraph = () => {
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="task">
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="time">
              <BarChart3 size={16} />
              Time-Log
            </TabsTrigger>
            <TabsTrigger value="task">
              <BarChart2 size={16} />
              Task Completion
            </TabsTrigger>
          </TabsList>
          <TabsContent value="time">
            <StaffTimeGraph />
          </TabsContent>
          <TabsContent value="task">
            <StaffTimeGraph />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TaskAndTimeGraph;
