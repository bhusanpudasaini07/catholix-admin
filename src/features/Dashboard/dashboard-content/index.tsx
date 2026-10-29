import {
  AreaChart,
  Gift,
  Library,
  List,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  User2,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

import { useCommonStore } from "@/store/common-store";
import DashboardTime from "./dashboard-time";
import { Card } from "@/shared/components/ui/card";

const MapContent = dynamic(import("./dashboard-map"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const DashboardContent = () => {
  const router = useRouter();
  const { profileData } = useCommonStore();

  console.log(profileData);

  const dashboardCards = [
    {
      title: "Products",
      value: 45,
      icon: <ShoppingBag className="w-20 h-20" />,
    },
    {
      title: "Categories",
      value: 10,
      icon: <Library className="w-20 h-20" />,
    },
    {
      title: "Bundles",
      value: 2,
      icon: <Gift className="w-20 h-20" />,
    },
    {
      title: "Orders",
      value: 11,
      icon: <ShoppingCart className="w-20 h-20" />,
    },

  ];


  return (
    <div className=" w-full h-full ">
      <div className="px-8">
        <div className="heading">
          <h1 className="text-2xl font-bold">Welcome,<span className="text-primary uppercase">{profileData?.firstName}</span></h1>
          <p className="text-sm text-gray-500">
            This is your dashboard. You can view and manage all the products, categories and orders.
          </p>
        </div>
        <div className="content my-5">
          <div className="grid grid-cols-12 gap-4">
            {dashboardCards.map((card) => (
              <div
                className="col-span-12 cursor-pointer sm:col-span-6 xl:col-span-4"
                key={card.title}
                role="link"
                tabIndex={0}
                onClick={() => router.push(`/${card.title.toLowerCase()}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(`/${card.title.toLowerCase()}`);
                  }
                }}
              >
                <Card className="p-4 transition-shadow hover:shadow-md">
                  <div className="flex justify-between items-center">
                    <div className="titles">
                      <p className="text-primary mb-2">{card.icon}</p>
                      <p className="text-sm text-gray-500">{card.title}</p>
                    </div>
                    <div className="value">
                      <p className="text-[120px] leading-none text-gray-500">{card.value}</p>
                    </div>
                  </div>

                </Card>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;
