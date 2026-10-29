import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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
  const id = router.query.catId;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  const maxSize = 5;
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

      form.setValue("categoryImage", file);
      setPreview(URL.createObjectURL(file));
    } else {
      setErrorMessage(newErrorMessage);
    }
  };

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
                        disabled={loading}
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
            {/* Category Description */}
            <FormField
              control={form.control}
              name="categoryDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Category Description</FormLabel>
                  <FormControl>
                    {showSkeleton ? (
                      <Skeleton className="w-full h-11" />
                    ) : (
                      <Input
                        disabled={loading}
                        className="placeholder:text-gray-270"
                        placeholder="Category Description"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category Image */}
            <FormField
              control={form.control}
              name="categoryImage"
              render={({ field }) => (
                <FormItem>

                  <FormLabel className="font-normal">Category Image</FormLabel>
                  <br />
                  <FormControl>
                    {showSkeleton ? (
                      <Skeleton className="w-full h-11" />
                    ) : (
                      <>

                        <input
                          id="fileInput"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/jpeg,image/png,image/jpg,image/gif"
                          type="file"
                          disabled={loading}
                          className="placeholder:text-gray-270"
                          placeholder="Category Image"
                        />
                        {errorMessage && (
                          <p className="text-sm text-destructive mt-2">{errorMessage}</p>
                        )}
                      </>
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
