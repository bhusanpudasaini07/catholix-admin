import ProfileForm from "@/features/Profile/profile-form";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

const EditProfile: NextPageWithLayout = () => {
  return (
    <div className="max-w-[670px] m-auto">
      <h2 className="text-primary text-4xl mb-12 font-bold">Edit User</h2>
      <ProfileForm />
    </div>
  );
};

export default EditProfile;

EditProfile.getLayout = (page) => {
  return <MainLayout title="Profile">{page}</MainLayout>;
};
