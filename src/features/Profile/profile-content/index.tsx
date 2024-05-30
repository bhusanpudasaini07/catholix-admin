import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

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
import { IProfile } from "@/interface/profile-interface";

const ProfileContent = () => {
  const router = useRouter();
  const form = useForm<IProfile>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //FUNCTIONS
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      form.reset();
      // showToast(TOAST_TYPES.success, "Logged in Successfully.");
      // router.push("/");
    },
    onError: (error: any) => {
      // showToast(TOAST_TYPES.error, error[0]?.detail || SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    const payload = {
      ...data,
    };
    // changePasswordMutation.mutate(payload);
    router.push("/");
  };
  const cancelHandler = () => {
    form.reset({
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
    });
  };
  return (
    <div className="p-6">
      <div className="flex gap-9 items-center">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarImage src="https://avatars.githubusercontent.com/u/1017377?v=4" />
        </Avatar>

        <div>
          <p className="mb-2 text-lg tetx-zinc-900">John Doe</p>
          <Button variant="secondary" size={"base"}>
            Update Picture
          </Button>
        </div>
      </div>
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
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="placeholder:text-gray-270"
                        placeholder="First Name"
                        {...field}
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="placeholder:text-gray-270"
                        placeholder="Last Name"
                        {...field}
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
                        className="placeholder:text-gray-270"
                        placeholder="Email"
                        {...field}
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
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        className="placeholder:text-gray-270"
                        placeholder="Mobile Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-2 items-center mt-9">
            <Button size={"md"} disabled={changePasswordMutation.isLoading}>
              {changePasswordMutation.isLoading && (
                <ButtonLoader className="mr-3" />
              )}
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
