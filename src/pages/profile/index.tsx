import React from "react";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/shared/main-layout";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

import { Mail, MapPin, Mobile } from "@/shared/lib/image-config";
import { useProfileStore } from "@/store/profile-store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { User } from "lucide-react";

const Profile: NextPageWithLayout = () => {
  const { profileData } = useProfileStore();
  return (
    <div className="max-w-[1023px] m-auto">
      <Card className="px-12 py-10">
        <CardContent className="p-0 flex flex-col gap-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Avatar className="bg-primary w-[80px] h-[80px]">
                <AvatarImage src={profileData?.image} alt="Company Logo" />
                <AvatarFallback>
                  <User width={100} className="text-white" />
                </AvatarFallback>
              </Avatar>
              <p className="text-4xl font-bold text-color break-all">
                {profileData?.first_name} {profileData?.last_name}
              </p>
            </div>
            <Link
              href={"/profile/edit"}
              className="w-[135px] h-auto leading-none text-center py-3.5 text-sm rounded-lg inline bg-white border border-purple-60 text-purple-60  hover:bg-purple-60 hover:text-white"
            >
              Edit
            </Link>
          </div>

          {/* Personal Information */}
          <div>
            <h5 className="text-2xl font-medium text-color mb-3">
              Personal Information
            </h5>
            <div className="flex items-center">
              <div className="flex items-center flex-1 gap-4">
                <Button className="rounded-full min-w-[43px] h-[43px] p-0">
                  <Image src={Mobile} width={12} height={20} alt="Icon" />
                </Button>
                <div>
                  <p className="text-sm text-gray-260 leading-8">Mobile No.</p>
                  <p className="text-sm font-medium text-color break-all">
                    {profileData?.mobile_number
                      ? profileData?.mobile_number
                      : "-"}
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-1 gap-4">
                <Button className="rounded-full min-w-[43px] h-[43px] p-0">
                  <Image src={Mail} width={21} height={15} alt="Icon" />
                </Button>
                <div>
                  <p className="text-sm text-gray-260 leading-8">Email</p>
                  <p className="text-sm font-medium text-color break-all">
                    {profileData?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-1 gap-4">
                <Button className="rounded-full min-w-[43px] h-[43px] p-0">
                  <Image src={MapPin} width={18} height={22} alt="Icon" />
                </Button>
                <div>
                  <p className="text-sm text-gray-260 leading-8">
                    Current Address
                  </p>
                  <p className="text-sm font-medium text-color break-all">
                    {profileData?.address ? profileData?.address : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

Profile.getLayout = (page) => {
  return <MainLayout title="Profile">{page}</MainLayout>;
};
