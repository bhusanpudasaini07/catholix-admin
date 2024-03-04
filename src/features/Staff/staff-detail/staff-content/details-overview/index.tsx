import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Award,
  BarChart,
  CalendarDays,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

const StaffDetailOverview = () => {
  const usersDetail = [
    // Designation
    {
      title: "Designation",
      icon: <Award size={20} />,
      data: "Senior UI/UX Designer",
    },
    // IC Level
    {
      title: "IC Level",
      icon: <BarChart size={20} />,
      data: "IC 4",
    },
    //Phone
    {
      title: "Phone",
      icon: <Phone size={20} />,
      data: "89123123123",
    },
    // Address
    {
      title: "Address",
      icon: <MapPin size={20} />,
      data: "Kathmandu",
    },
    // Joined Date
    {
      title: "Joined Date",
      icon: <CalendarDays size={20} />,
      data: "01/05/2017",
    },
    // EKbana Experience
    {
      title: "EKbana Experience",
      icon: <Star size={20} />,
      data: "4 Years 8 Months",
    },
    // Career Experience
    {
      title: "Career Experience",
      icon: <Star size={20} />,
      data: "11 Years 0 Months",
    },
  ];

  return (
    <Card>
      <CardContent>
        <div className="flex flex-wrap items-center gap-10">
          {/* Name Image */}
          <div className="flex items-center gap-6">
            <Avatar className="!size-[120px] text-3xl">
              <AvatarFallback>SA</AvatarFallback>
              <AvatarImage src="" />
            </Avatar>
            <div>
              <p className="text-2xl font-medium text-zinc-700">Sunil Gamal</p>
              <p className="text-sm text-primary">sunil.gamal@ekbana.info</p>
            </div>
          </div>

          {/* User Details */}
          {usersDetail?.map((user) => (
            <div
              className="flex items-start gap-2 text-zinc-500"
              key={user?.title}
            >
              {user?.icon}
              <div>
                <p className="mb-2 text-sm">{user?.title}</p>
                {user?.title === "IC Level" ? (
                  <Badge
                    variant={"outline"}
                    className="rounded shadow-sm text-primary bg-blue-50 border-primary"
                  >
                    {user?.data}
                  </Badge>
                ) : (
                  <p className="text-sm font-medium text-zinc-700">
                    {user?.data}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffDetailOverview;
