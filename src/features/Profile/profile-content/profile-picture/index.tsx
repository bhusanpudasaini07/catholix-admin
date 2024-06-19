import React, { useRef, useState } from "react";

import { IProfileData } from "@/interface/profile-interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useMutation, useQueryClient } from "react-query";
import { updateProfilePicture } from "@/services/profile/profile-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import Image from "next/image";

interface IProps {
  profileData: IProfileData | undefined;
}

const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
const maxSize = 5; // MB

const ProfilePicture = ({ profileData }: IProps) => {
  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    let newErrorMessage: string = "";

    if (!allowedTypes.includes(file.type)) {
      newErrorMessage = "Only ( JPG | PNG | JPEG | GIF ) images are allowed";
    }
    if (file.size / 1024 / 1024 > maxSize) {
      newErrorMessage = `Maximum size allowed is ${maxSize}MB`;
    }
    if (file && !newErrorMessage) {
      const payload = {
        avatar: file,
      };
      profileImageMutation.mutate(payload);
    } else {
      setErrorMessage(newErrorMessage);
    }
  };

  const profileImageMutation = useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      showToast(TOAST_TYPES.success, "Profile picture updated successfully");
    },
    onError: () => {
      showToast(TOAST_TYPES.error, "Failed to update profile picture");
    },
  });

  return (
    <>
      <div className="flex gap-9 items-center">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage
            src={profileData?.data?.avatar || ""}
            alt="Profile Image"
          />
          <AvatarFallback className="text-2xl uppercase">
            {profileData?.data?.firstName[0]}
            {profileData?.data?.lastName[0]}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="mb-2 text-lg tetx-zinc-900">
            {profileData?.data?.firstName} {profileData?.data?.lastName}
          </p>
          <Button
            variant="secondary"
            size={"base"}
            onClick={() => fileInputRef.current?.click()}
          >
            Update Picture
          </Button>
          <div className="hidden">
            <Input
              id="fileInput"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="mt-2 text-xs leading-4 text-destructive">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default ProfilePicture;
