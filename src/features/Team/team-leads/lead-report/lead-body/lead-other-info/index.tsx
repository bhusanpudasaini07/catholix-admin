import {
  User2,
  UserCircle,
  UserCircle2,
  UserPlus,
  Users,
  Users2,
  Warehouse,
} from "lucide-react";
import React, { FC } from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { changeNumberFormat } from "@/shared/utils/rp-utils";

interface IProps {
  in_house?: string;
  client?: string;
  staff?: string;
}

const OtherInfo: FC<IProps> = ({ in_house, client, staff }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-4">
          <h5 className="font-medium text-zinc-700">Other Information</h5>
        </div>

        <div className="flex flex-wrap justify-between gap-5 pr-20 mt-9">
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-zinc-700">
              <Warehouse size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-zinc-700">
                {in_house ? changeNumberFormat(Number(in_house)) : "N/A"}
              </p>
              <p className="text-sm text-zinc-600">In-House Project Budget</p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-zinc-700">
              <UserCircle size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-zinc-700">
                {client ? changeNumberFormat(Number(client)) : "N/A"}
              </p>
              <p className="text-sm font-normal text-zinc-600">
                Client&apos;s Project Budget
              </p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-zinc-700">
              <Users2 size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-zinc-700">
                {staff ? staff : "N/A"}
              </p>
              <p className="text-sm text-zinc-600">Total Staff</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherInfo;
