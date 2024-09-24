import MainLayout from "@/shared/main-layout";
import React from "react";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import MonthlySummary from "@/features/Summary-Report/monthly-summary";
import DevicesSummary from "@/features/Summary-Report/devices";
import SummaryTopTable from "@/features/Summary-Report/top-table";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowDown } from "lucide-react";

const SummaryReport = () => {
  const columns = [
    {
      id: "sn",
      header: "SN",
      accessorKey: "sn",
    },
    {
      id: "name",
      header: "Dealer Name",
      accessorKey: "name",
    },
    {
      id: "gc",
      header: "GC",
      accessorKey: "gc",
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center justify-between">
            <p>{row.original.gc}</p>
            <Badge variant={"destructiveLight"}>
              <ArrowDown size={14} />
            </Badge>
          </div>
        );
      },
    },
  ];
  const dummyData = [
    { sn: 1, name: "CHRIS GLASSER", gc: 8904 },
    { sn: 2, name: "FRANCES SWANN", gc: 4574 },
    { sn: 3, name: "DENNIS CALLIS", gc: 3435 },
  ];
  return (
    <>
      <div className="px-8 pt-8 border-b">
        <PageHeader title={"Summary Report"} />
      </div>

      <div className="px-8 py-4">
        <MonthlySummary />

        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 mt-6">
          <DevicesSummary />

          <SummaryTopTable
            data={dummyData}
            title={"Top 3 Dealer"}
            columns={columns}
            loading={false}
          />
          <SummaryTopTable
            data={dummyData}
            title={"Top 3 Agent"}
            columns={columns}
            loading={false}
          />
          <SummaryTopTable
            data={dummyData}
            title={"Top 3 Region"}
            columns={columns}
            loading={false}
          />
          <SummaryTopTable
            data={dummyData}
            title={"Top 3 State"}
            columns={columns}
            loading={false}
          />
          <SummaryTopTable
            data={dummyData}
            title={"Top 3 LGA"}
            columns={columns}
            loading={false}
          />
        </div>
      </div>
    </>
  );
};

export default SummaryReport;

export const getStaticProps = getI18nProps;

SummaryReport.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
