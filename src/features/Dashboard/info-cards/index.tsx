import React from "react";
import Image from "next/image";
import { dashboard } from "@/shared/lib/image-config";
import { IDashboardData } from "@/interface/dashboard-interface";

interface IProps {
  dashboardData: IDashboardData | undefined;
}

const DashboardInfoCards = ({ dashboardData }: IProps) => {
  const dashboardCardArray = [
    {
      title: "Latest Invoice",
      subTitle: "This Month",
      value: dashboardData?.total_info?.latest_invoice,
      icon: dashboard?.latest_invoice,
      color: "bg-dashboard-50",
    },
    {
      title: "Pending For approval",
      subTitle: "Last 30 days",
      value: (
        <>
          {dashboardData?.total_info?.last_month_pending_approval_invoices}{" "}
          <span className="text-[15px] leading-3">
            /{dashboardData?.total_info?.last_month_invoice_count}
          </span>
        </>
      ),
      icon: dashboard?.pending_approval,
      color: "bg-dashboard-60",
    },
    {
      title: "Invoice amount",
      subTitle: "This Month Till date ",
      value: dashboardData?.total_info?.this_month_invoice_amount.toFixed(2),
      icon: dashboard?.invoice_amount,
      color: "bg-dashboard-70",
    },
    {
      title: "Last Month Invoice Amount",
      subTitle: "Last Month Invoice Amount",
      value: dashboardData?.total_info?.last_month_invoice_amount.toFixed(2),
      icon: dashboard?.last_month,
      color: "bg-dashboard-80",
    },
    {
      title: "This month invoices",
      subTitle: "Total approved bills",
      value: dashboardData?.total_info?.approved_bills_this_month,
      icon: dashboard?.this_month,
      color: "bg-dashboard-90",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-6 gap-5">
      {dashboardCardArray?.map((card: any, index: number) => (
        <div
          className={`py-4 px-7 rounded-lg relative min-h-[116px] ${card?.color}`}
          key={index}
        >
          <div>
            <h5 className="text-dark-55 text-sm font-bold uppercase leading-3">
              {card?.title}
            </h5>
            <p className="text-black/40 text-sm mt-2 ">{card?.subTitle}</p>
            <div className="text-2xl text-dark-55 font-medium mt-3">
              {card?.value}
            </div>
          </div>
          <Image
            src={card?.icon}
            width={50}
            height={50}
            quality={100}
            alt="Latest Invoice"
            className="absolute bottom-4 right-6"
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardInfoCards;
