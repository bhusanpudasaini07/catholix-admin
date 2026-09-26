import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
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
import { Button } from "@/shared/components/ui/button";
import { IProductsPost } from "@/interface/products-interface";
import { Textarea } from "@/shared/components/ui/textarea";
import { useCategory } from "@/hooks/categories/useCategory.hook";
import { ICategoryList } from "@/interface/category-interface";
import { Select } from "@/shared/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";


interface IProps {
  form: UseFormReturn<IProductsPost>;
  loading: boolean;
  selected: { id: number; name: string }[];
  setSelected: (selected: { id: number; name: string }[]) => void;
  showSkeleton: boolean;
}

const ProductFormContent = ({
  form,
  showSkeleton,
  loading
}: IProps) => {
  const router = useRouter();
  const id = router.query.productId;

  const { categoryList, categoryLoading,  } = useCategory();

  const fileInputRef = useRef<HTMLInputElement>(null);
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
      
      form.setValue("productImage", file);
      debugger
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
              Product
            </h5>
  
          </div>
          <div className="space-y-4">
            {/* Product Name name */}
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Product Name
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    {showSkeleton ? (
                      <Skeleton className="w-full h-11" />
                    ) : (
                      <Input
                        disabled={loading }
                        className="placeholder:text-gray-270"
                        placeholder="Product Name"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
           {/* Product Description */}
           <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Product Description
                  </FormLabel>
                  <Textarea {...field} />
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          
            {/* Product Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  
                  <FormControl>
                    {categoryLoading ? (
                      <Skeleton className="w-full h-9" />
                    ) : (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        name={field.name}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-[999999]">
                          {Array.isArray(categoryList?.data) && categoryList?.data?.length > 0 ? (
                            categoryList?.data.map((category: ICategoryList) => (
                              <SelectItem
                                key={category?.id}
                                value={String(category?.id)}
                              >
                                {category?.categoryName}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-400 text-sm">
                              No categories found
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
   
            {/* Product Price */}
            <FormField
              control={form.control}
              name="productPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Product Price
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <Input type="number" placeholder="Product Price"  disabled={loading} className="placeholder:text-gray-270" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            </div>
            {/* Product Image */}
            <FormField
              control={form.control}
              name="productImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Product Image
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <Input 
                  id="fileInput"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                   className="placeholder:text-gray-270" />
                   {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}
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
                  router.push("/products");
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

export default ProductFormContent;
