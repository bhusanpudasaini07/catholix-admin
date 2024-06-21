import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IChangePasswordFormInput } from "@/interface/auth-interface";
import { changePassword } from "@/services/auth/auth-service";
import ButtonLoader from "@/shared/components/loader/button-loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/schema/profile-schema/profile-schema";
import { IProfile, IProfileData } from "@/interface/profile-interface";
import { useCommonStore } from "@/store/common-store";
import { getProfile, updateProfile } from "@/services/profile/profile-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { constants } from "@/constants";
import { useRef, useState } from "react";
import ProfilePicture from "./profile-picture";
import { handleKeyDownNumber } from "@/shared/utils/form-utils";

const { SOMETHING_WENT_WRONG } = constants.messages;

const ProfileContent = () => {
  const router = useRouter();
  const { setProfile } = useCommonStore();
  const queryClient = useQueryClient();

  const form = useForm<IProfile>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { data: profileData } = useQuery<IProfileData>(
    ["profile"],
    getProfile,
    {
      onSuccess: (data) => {
        form.reset({
          firstName: data?.data?.firstName,
          lastName: data?.data?.lastName,
          email: data?.data?.email,
          contact: data?.data?.contact || "",
        });
        setProfile(data?.data);
      },
    }
  );

  //FUNCTIONS
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      form.reset({ ...data?.data });
      showToast(TOAST_TYPES.success, "Profile updated successfully");
      queryClient.invalidateQueries("profile");
    },
    onError: (error: any) => {
      error?.message?.map((err: any) => {
        form.setError(err?.name, { message: err?.errors[0] });
      });
      // if (error) {
      //   showToast(TOAST_TYPES.error, error.message || SOMETHING_WENT_WRONG);
      // } else {
      //   showToast(TOAST_TYPES.error, SOMETHING_WENT_WRONG);
      // }
    },
  });

  // Update prof

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    const { email, ...restPayload } = data;
    const payload = {
      ...restPayload,
    };
    updateProfileMutation.mutate(payload);
  };

  const cancelHandler = () => {
    form.reset({
      firstName: profileData?.data?.firstName,
      lastName: profileData?.data?.lastName,
      email: profileData?.data?.email,
      contact: profileData?.data?.contact || "",
    });
  };

  return (
    <div className="p-6">
      <ProfilePicture profileData={profileData} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="w-full max-w-[690px] mt-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="First Name"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="placeholder:text-gray-270"
                        placeholder="Last Name"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        readOnly
                        className="placeholder:text-gray-270"
                        placeholder="Email"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Mobile Number"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        value={field.value ?? ""}
                        onKeyDown={handleKeyDownNumber}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-2 items-center mt-9">
            <Button
              size={"md"}
              disabled={updateProfileMutation.isLoading}
              loading={updateProfileMutation.isLoading}
            >
              Update
            </Button>
            <Button
              onClick={cancelHandler}
              type="button"
              size={"md"}
              variant={"secondary"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileContent;
