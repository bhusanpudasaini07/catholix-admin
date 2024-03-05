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
import moment from "moment";
import StaffDetailSkeleton from "@/shared/components/skeleton-loading/staffs/staff-details-skeleton";

interface IProps {
  image: string;
  name: string;
  email: string;
  designation: string;
  ic: string;
  phone: string;
  // address: string;
  joined_date: string;
  careerExp: string;
  loading: boolean;
}

const StaffDetailOverview = ({
  image,
  name,
  email,
  designation,
  ic,
  // address,
  joined_date,
  careerExp,
  phone,
  loading,
}: IProps) => {
  const usersDetail = [
    // Designation
    {
      title: "Designation",
      icon: <Award size={20} />,
      data: designation,
    },
    // IC Level
    {
      title: "IC Level",
      icon: <BarChart size={20} />,
      data: ic,
    },
    //Phone
    {
      title: "Phone",
      icon: <Phone size={20} />,
      data: phone,
    },
    // Address
    // {
    //   title: "Address",
    //   icon: <MapPin size={20} />,
    //   data: address,
    // },
    // Joined Date
    {
      title: "Joined Date",
      icon: <CalendarDays size={20} />,
      data: joined_date,
    },
    // EKbana Experience
    {
      title: "EKbana Experience",
      icon: <Star size={20} />,
      data: `${moment().diff(moment(joined_date), "years")} Years ${
        moment().diff(moment(joined_date), "months") % 12
      } Months`,
    },
    // Career Experience
    {
      title: "Career Experience",
      icon: <Star size={20} />,
      data: `${moment().diff(moment(careerExp), "years")} Years ${
        moment().diff(moment(careerExp), "months") % 12
      } Months`,
    },
  ];

  return (
    <>
      {loading ? (
        <StaffDetailSkeleton />
      ) : (
        <Card>
          <CardContent>
            <div className="flex items-center gap-10">
              {/* Name Image */}
              <div className="flex items-center gap-6 ">
                <Avatar className="!size-[120px] text-3xl">
                  <AvatarFallback>
                    {name?.split(" ").map((item) => item[0])}
                  </AvatarFallback>
                  <AvatarImage src={image} />
                </Avatar>
                <div>
                  <p className="text-2xl font-medium text-zinc-700 whitespace-nowrap">
                    {name}
                  </p>
                  <p className="text-sm text-primary">{email}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-10 gap-y-6 ">
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
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default StaffDetailOverview;
