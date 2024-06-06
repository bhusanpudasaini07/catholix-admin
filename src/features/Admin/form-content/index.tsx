import { Button } from "@/shared/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn;
}

const AdminFormContent = ({ form }: IProps) => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* First name */}
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Last name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Last Name</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-gray-270"
                  placeholder="Last Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Email</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-gray-270"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone */}
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  className="placeholder:text-gray-270"
                  placeholder="987-897-789456"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Reginal Permission */}
        <div className="xl:col-span-2">
          <FormField
            control={form.control}
            name="regionalPermission"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">
                  Regional Permission
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center items-center p-6 rounded-lg min-h-[120px] shadow-sm">
                    <Button
                      onClick={() => router.push("/regional-permissions")}
                      variant={"primary"}
                      size={"base"}
                      className="gap-2"
                    >
                      <ShieldCheck size={20} />
                      Assign Permission
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* CMS Permission */}
        <div className="xl:col-span-2">
          <FormField
            control={form.control}
            name="cmsPermissions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">CMS Permission</FormLabel>
                <FormControl>
                  <div className="flex justify-center items-center p-6 rounded-lg min-h-[120px] shadow-sm">
                    <Button
                      onClick={() => router.push("/cms-permissions")}
                      variant={"primary"}
                      size={"base"}
                      className="gap-2"
                    >
                      <ShieldCheck size={20} />
                      Assign Permission
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-start mt-6">
        <Button variant={"primary"} className="gap-2">
          Save
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/admins")}
          variant={"secondary"}
          className="gap-2"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default AdminFormContent;
