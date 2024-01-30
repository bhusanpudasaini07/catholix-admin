import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import DragDrop from "@/shared/components/drag-drop";

import { useProfileStore } from "@/store/profile-store";
import { IProfile } from "@/interface/profile-interface";
import { ProfileSchema } from "@/schema/profile-schema/profile-schema";
import { updateProfile } from "@/services/profile/profile-service";
import { constants } from "@/constants";
import { isAnyFieldEmpty } from "@/shared/utils/form-utils";

const ProfileForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { profileData } = useProfileStore();
  const { SOMETHING_WENT_WRONG } = constants.messages;

  const fieldNames = ["first_name", "last_name"];

  //   STATES
  const [file, setFile] = useState(null);

  const form = useForm<IProfile>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...profileData,
    },
  });

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["profile"]);
      router.push("/profile");
    },
    onError: () => {
      showToast(TOAST_TYPES.error, SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    const payload = {
      profile_data: JSON.stringify({ ...data }),
      image: file,
    };
    profileMutation.mutate(payload);
  };

  useEffect(() => {
    form.reset({
      first_name: profileData?.first_name,
      last_name: profileData?.last_name,
      email: profileData?.email,
      mobile_number: profileData?.mobile_number,
    });
  }, [profileData]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        encType="multipart/form-data"
      >
        <Card className="px-8 py-10">
          <CardContent className="p-0">
            <h5 className="text-2xl font-medium text-color mb-3">
              User Information
            </h5>
            <div className="grid grid-cols-12 gap-5 w-full">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        {"First Name"}
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-270 text-color"
                          placeholder="Your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        {"Last Name"}
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-270 text-color"
                          placeholder="Your last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        {"Email"}
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          className="placeholder:text-gray-270 text-color"
                          placeholder="Your email"
                          value={field?.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        Mobile Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-270 text-color"
                          placeholder="Your mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <DragDrop module="profile" file={file} setFile={setFile} />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-end gap-7 mt-12">
          <Link
            href={"/profile"}
            className="w-[135px] h-auto leading-none text-center py-3.5 text-sm rounded-lg inline bg-white border border-purple-60 text-purple-60  hover:bg-purple-60 hover:text-white"
          >
            Back
          </Link>
          <Button
            disabled={
              isAnyFieldEmpty(form.control._formValues, fieldNames) ||
              profileMutation?.isLoading
            }
            className="w-[146px] p-0 h-[48px]"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
