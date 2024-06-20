import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "react-query";

import { IAdminForm } from "@/interface/admin-interface";
import { IRoles } from "@/interface/roles-interface";
import { getRoles } from "@/services/roles/roles-service";
import ButtonLoader from "@/shared/components/loader/button-loader";
import { MultiSelect } from "@/shared/components/multi-select";
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
import { getRegions } from "@/services/admin/admin-service";
import {
  ILocalGovernment,
  IRegionProps,
  IState,
} from "@/interface/common-interface";

interface IProps {
  form: UseFormReturn<IAdminForm>;
  loading: boolean;
  selected: { id: number; name: string }[];
  setSelected: (selected: { id: number; name: string }[]) => void;
}

const AdminFormContent = ({ form, loading, selected, setSelected }: IProps) => {
  const router = useRouter();
  const { id } = router.query;

  const [localGovernments, setLocalGovernments] = useState<ILocalGovernment[]>(
    []
  );

  const { data: rolesList, isLoading: rolesLoading } = useQuery<IRoles>({
    queryFn: () => getRoles(1, 100),
    queryKey: ["roles"],
  });

  const { data: regionsList, isLoading: regionsListLoading } =
    useQuery<IRegionProps>({
      queryFn: getRegions,
      queryKey: ["regionsList"],
    });

  // const filterRegionStates = (id: string) => {
  //   const region = regionsList?.data?.regions?.find(
  //     (region) => region.id === Number(id)
  //   );
  //   setRegionStates(region?.states ?? []);
  //   // form.setValue("stateId", "");
  //   // form.setValue("localGovId", []);
  // };

  const filterLocalGovs = (id: string) => {
    const state = regionsList?.data?.regions
      ?.find((region) => region?.id === Number(form.watch("regionId")))
      ?.states?.find((state) => state?.id === Number(id));
    setLocalGovernments(state?.localGovernments ?? []);
    form.setValue("localGovId", []);
    setSelected([]);
  };

  useEffect(() => {
    if (selected.length > 0) {
      form.setValue(
        "localGovId",
        selected?.map((lg) => lg?.id?.toString())
      );
    }
  }, [selected]);

  useEffect(() => {
    if (form.watch("stateId")) {
      const state = regionsList?.data?.regions
        ?.find((region) => region?.id === Number(form.watch("regionId")))
        ?.states?.find((state) => state?.id === Number(form.watch("stateId")));
      setLocalGovernments(state?.localGovernments ?? []);
    }
  }, [form.watch("stateId")]);

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h5 className="text-xl font-bold text-zinc-900">
              Admins/
              {router.asPath.includes("/edit")
                ? "Edit"
                : id
                ? "View"
                : "Add"}{" "}
              Admin
            </h5>
            <div className="flex items-center px-4 py-2 rounded-lg bg-secondary">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="items-center space-x-2 !space-y-0 flex">
                    <FormLabel>Admin Status</FormLabel>
                    <FormControl>
                      <Switch
                        disabled={
                          !router.asPath.includes("edit") && id ? true : false
                        }
                        checked={field.value}
                        defaultChecked={true}
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
                      disabled={
                        !router.asPath.includes("edit") && id ? true : false
                      }
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
                      disabled={
                        !router.asPath.includes("edit") && id ? true : false
                      }
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
                      disabled={
                        !router.asPath.includes("edit") && id ? true : false
                      }
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

            {/* Regional Permissions  */}
            <div>
              <FormItem>
                <FormLabel className="font-normal">
                  Regional Permission
                </FormLabel>
                <div className="grid grid-cols-3 gap-2 p-6 rounded-lg border shadow-sm">
                  {/* Region */}
                  <FormField
                    control={form.control}
                    name="regionId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Select Region
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value ? field.value.toString() : ""}
                            onValueChange={(value) => {
                              field.onChange(value);
                              form.setValue("stateId", "");
                              form.setValue("localGovId", []);
                              setSelected([]);
                            }}
                            disabled={
                              !router.asPath.includes("edit") && id
                                ? true
                                : false
                            }
                          >
                            <SelectTrigger className="max-w-80">
                              <SelectValue
                                placeholder="Select Region"
                                defaultValue={field.value}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">All</SelectItem>

                              {regionsList?.data?.regions?.map((region) => (
                                <SelectItem
                                  key={region?.id}
                                  value={region?.id?.toString()}
                                >
                                  {region?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* State */}
                  {form.watch("regionId") && form.watch("regionId") !== "0" && (
                    <FormField
                      control={form.control}
                      name="stateId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            Select State
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? field.value.toString() : ""}
                              onValueChange={(value) => {
                                field.onChange(value);
                                filterLocalGovs(value);
                              }}
                              disabled={
                                !router.asPath.includes("edit") && id
                                  ? true
                                  : false
                              }
                            >
                              <SelectTrigger className="max-w-80">
                                <SelectValue
                                  placeholder="Select State"
                                  defaultValue={field.value ?? ""}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">All</SelectItem>
                                {regionsList?.data?.regions
                                  ?.find(
                                    (region) =>
                                      region?.id ===
                                      Number(form.watch("regionId"))
                                  )
                                  ?.states?.map((state) => (
                                    <SelectItem
                                      key={state?.id}
                                      value={state?.id?.toString()}
                                    >
                                      {state?.name}
                                    </SelectItem>
                                  ))}
                                {/* {regionStates?.map((state) => (
                                    <SelectItem
                                      key={state?.id}
                                      value={state?.id?.toString()}
                                    >
                                      {state?.name}
                                    </SelectItem>
                                  ))} */}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {/* LGA */}
                  {form.watch("stateId") && form.watch("stateId") !== "0" && (
                    <FormField
                      control={form.control}
                      name="localGovId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            Select LGA
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <MultiSelect
                              disabled={
                                !router.asPath.includes("edit") && id
                                  ? true
                                  : false
                              }
                              dataList={localGovernments?.map((lg) => ({
                                id: lg?.id,
                                name: lg?.name,
                              }))}
                              placeholder={"Select LGA"}
                              selected={selected}
                              setSelected={setSelected}
                              module="LGA"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </FormItem>
            </div>

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
                          disabled={
                            !router.asPath.includes("edit") && id ? true : false
                          }
                        >
                          <SelectTrigger className="max-w-80">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            {rolesList?.data?.results?.map((role) => (
                              <SelectItem
                                key={role?.id}
                                value={role?.id?.toString()}
                              >
                                {role?.name}
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

          {!router.asPath.includes("edit") && id ? (
            ""
          ) : (
            <div className="flex gap-2 justify-start mt-6">
              <Button variant={"primary"} disabled={loading} className="gap-2">
                {loading && <ButtonLoader />}
                {id ? "Update" : "Create"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  router.push("/admins");
                  form.reset();
                }}
                variant={"secondary"}
                className="gap-2"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AdminFormContent;
