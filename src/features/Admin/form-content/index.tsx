import { IAdminForm } from "@/interface/admin-interface";
import { IRoles } from "@/interface/roles-interface";
import { getRoles } from "@/services/roles/roles-service";
import ButtonLoader from "@/shared/components/loader/button-loader";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Switch } from "@/shared/components/ui/switch";
import { handleKeyDownNumber } from "@/shared/utils/form-utils";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "react-query";

interface IProps {
  form: UseFormReturn<IAdminForm>;
  loading: boolean;
}

const AdminFormContent = ({ form, loading }: IProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: rolesList, isLoading: rolesLoading } = useQuery<IRoles>({
    queryFn: () => getRoles(1, 100),
    queryKey: ["roles"],
  });

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h5 className="text-xl font-bold text-zinc-900">
              Admins/{id ? "Edit" : "Add"} Admin
            </h5>
            <div className="flex items-center px-4 py-2 rounded-lg bg-secondary">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="items-center space-x-2 !space-y-0 flex">
                    <FormLabel>User Status</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        defaultChecked={false}
                        onCheckedChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
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
                      disabled={id ? true : false}
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
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-gray-270"
                      placeholder="987-897-789456"
                      {...field}
                      onKeyDown={handleKeyDownNumber}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Reginal Permission */}
            {/* <div>
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
            </div> */}
            {/* Role  */}
            <div>
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Role</FormLabel>
                    <div className="flex flex-col p-6 space-y-2 rounded-lg border shadow-sm">
                      <FormLabel>
                        Select Role
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="max-w-80">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            {rolesList?.data?.results?.map((role) => (
                              <SelectItem
                                key={role.id}
                                value={role.id.toString()}
                              >
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-start mt-6">
            <Button variant={"primary"} disabled={loading} className="gap-2">
              {loading && <ButtonLoader />}
              {id ? "Update" : "Create"}
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
        </CardContent>
      </Card>
    </>
  );
};

export default AdminFormContent;
