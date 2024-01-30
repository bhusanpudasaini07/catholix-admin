import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { Card, CardContent } from "@/shared/components/ui/card";
import Image from "next/image";
import { Lock } from "@/shared/lib/image-config";
import ChangePasswordForm from "@/features/Change-Password/change-password-form";

const ChangePassword: NextPageWithLayout = () => {
  return (
    <div className="max-w-[465px] m-auto">
      <Card className="border-0 shadow-none px-11 py-14">
        <CardContent className="p-0">
          <div className="flex flex-col items-center gap-7 mb-7">
            <h2 className="text-purple-60 text-4xl font-bold text-center">
              Change Password
            </h2>
            <Image src={Lock} alt="Lock Image" width={120} height={100} />
          </div>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;

ChangePassword.getLayout = (page) => {
  return <MainLayout title="Change Password">{page}</MainLayout>;
};
