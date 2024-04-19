import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

import { Plus, Save } from "lucide-react";
import React, { useState } from "react";
import QuoteGenerationTable from "./quote-generation-table";

import QuoteSaveModal from "../quote-save-modal";

const QuoteGeneration = () => {
  const [openSaveModal, setOpenSaveModal] = useState(false);
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Quote Generation</p>

          <div className="flex gap-4 items-center">
            <Button variant={"outline"}>
              <Plus size={20} /> Add New Role
            </Button>
            <Button onClick={() => setOpenSaveModal(true)}>
              <Save size={20} />
              Save
            </Button>
          </div>
        </div>
        <QuoteGenerationTable />

        {/* Save Modal */}
        <QuoteSaveModal
          openModal={openSaveModal}
          setOpenModal={setOpenSaveModal}
        />
      </CardContent>
    </Card>
  );
};

export default QuoteGeneration;
