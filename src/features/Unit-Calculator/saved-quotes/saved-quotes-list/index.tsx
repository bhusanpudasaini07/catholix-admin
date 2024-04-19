import useSavedQuotes from "@/hooks/unit-calculator/useSavedQuotes.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const SavedQuotesList = () => {
  const { columns, dummyData } = useSavedQuotes();

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Saved Quotes</p>
        </div>

        <DataTable columns={columns} data={dummyData} border />
      </CardContent>
    </Card>
  );
};

export default SavedQuotesList;
