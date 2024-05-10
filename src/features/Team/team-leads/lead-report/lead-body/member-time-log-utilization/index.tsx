import { Card, CardContent } from "@/shared/components/ui/card";
import { User2, Users2 } from "lucide-react";
import { FC } from "react";
interface IUtilizationData {
  less_than_20?: string;
  "20_to_40"?: string;
  "40_to_80"?: string;
  greater_than_80?: string;
}

interface IProps {
  data: IUtilizationData;
}
const MemberTimeUtilization: FC<IProps> = ({ data }) => {
  let totalStaff =
    parseFloat(data?.less_than_20 ?? "0") +
    parseFloat(data?.["20_to_40"] ?? "0") +
    parseFloat(data?.["40_to_80"] ?? "0") +
    parseFloat(data?.greater_than_80 ?? "0");

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      <Card>
        <CardContent className="!p-4">
          <div className="flex items-start gap-[4px] justify-start">
            <Users2 size={30} className="shrink-0 text-zinc-700 mt-1" />
            <div>
              <p className="text-zinc-700 text-3xl font-semibold mb-1">
                {totalStaff ? totalStaff : 0}
              </p>
              <p className="text-zinc-700 text-sm font-normal">Members</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="!p-4">
          <div className="flex items-start gap-[4px] justify-start">
            <User2 size={30} className="shrink-0 text-red-500 mt-1" />
            <div>
              <p className="text-red-500 text-3xl font-semibold mb-1 flex items-center justify-start gap-2">
                {data?.less_than_20 ? data?.less_than_20 : 0}
                {/* <ArrowUp className="text-zinc-400" size={14} /> */}
              </p>
              <p className="text-red-500 text-sm font-normal">{`< 20%`}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="!p-4">
          <div className="flex items-start gap-[4px] justify-start">
            <User2 size={30} className="shrink-0 text-orange-500 mt-1" />
            <div>
              <p className="text-orange-500 text-3xl font-semibold mb-1 flex items-center justify-start gap-2">
                {data?.["20_to_40"] ? data?.["20_to_40"] : 0}
                {/* <ArrowUp className="text-zinc-400" size={14} /> */}
              </p>
              <p className="text-orange-500 text-sm font-normal whitespace-nowrap">{`20% - 40%`}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="!p-4">
          <div className="flex items-start gap-[4px] justify-start">
            <User2 size={30} className="shrink-0 text-indigo-700 mt-1" />
            <div>
              <p className="text-indigo-700 text-3xl font-semibold mb-1 flex items-center justify-start gap-2">
                {data?.["40_to_80"] ? data?.["40_to_80"] : 0}
                {/* <ArrowUp className="text-zinc-400" size={14} /> */}
              </p>
              <p className="text-indigo-700 text-sm font-normal whitespace-nowrap">{`40% - 80%`}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="!p-4">
          <div className="flex items-start gap-[4px] justify-start">
            <User2 size={30} className="shrink-0 text-green-500 mt-1" />
            <div>
              <p className="text-green-500 text-3xl font-semibold mb-1 flex items-center justify-start gap-2">
                {data?.greater_than_80}
                {/* <ArrowUp className="text-zinc-400" size={14} /> */}
              </p>
              <p className="text-green-500 text-sm font-normal whitespace-nowrap">{`> 80%`}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberTimeUtilization;
