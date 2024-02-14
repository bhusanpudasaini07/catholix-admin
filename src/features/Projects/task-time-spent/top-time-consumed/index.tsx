import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const TopTimeConsumed = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Top 5 Most Time Consumed */}
      <Card>
        <CardContent>Top 5 Most Time Consumed</CardContent>
      </Card>
      {/* Top 10 Most Time Consumed for Git Commit */}
      <Card>
        <CardContent>Top 5 Most Time Consumed</CardContent>
      </Card>
    </div>
  );
};

export default TopTimeConsumed;
