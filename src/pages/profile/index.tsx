import { User2 } from "lucide-react";
import React from "react";

import ChangePasswordContent from "@/features/Profile/change-password-content";
import ProfileContent from "@/features/Profile/profile-content";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import MainLayout from "@/shared/main-layout";
import LockOpen from "@/shared/svg/lock-open";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";
import PageHeader from "@/shared/components/page-header";

const Profile: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      <PageHeader title="My Profile" />

      <div className="grid grid-cols-1 gap-6 mt-8">
        <Tabs defaultValue="profile">
          <TabsList className="w-full">
            <TabsTrigger value="profile">
              <User2 size={20} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password">
              <LockOpen size={20} />
              Change Password
            </TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <ProfileContent />
          </TabsContent>

          {/* Change Password */}
          <TabsContent value="password">
            <ChangePasswordContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

export const getStaticProps = getI18nProps;

Profile.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
