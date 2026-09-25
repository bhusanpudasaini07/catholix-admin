import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";


import { Card, CardContent } from "@/shared/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { ICategoryPost } from "@/interface/category-interface";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  form: UseFormReturn<ICategoryPost>;
  loading: boolean;
  selected: { id: number; name: string }[];
  setSelected: (selected: { id: number; name: string }[]) => void;
  showSkeleton: boolean;
}

const CategoriesFormContent = ({
  form,
  showSkeleton,
  loading
}: IProps) => {
  const router = useRouter();
  const { id } = router.query;



  return (
    <>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h5 className="text-xl font-bold text-zinc-900">
            
              {id
                ? "Edit"
                : "Add"}{" "}
              Categories
            </h5>
  
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {/* Category Name name */}
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Category Name
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    {showSkeleton ? (
                      <Skeleton className="w-full h-11" />
                    ) : (
                      <Input
                        disabled={loading }
                        className="placeholder:text-gray-270"
                        placeholder="Category Name"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
         
            
          </div>
          <div className="flex gap-2 justify-start mt-6">
              <Button
                variant={"primary"}
                loading={loading}
                disabled={loading}
                className="gap-2"
              >
                {id ? "Update" : "Create"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  router.push("/categories");
                  form.reset();
                }}
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

export default CategoriesFormContent;
