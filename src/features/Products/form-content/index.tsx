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
import Image from "next/image";
import { Sparkles, X } from "lucide-react";
import { useProducts } from "@/hooks/products/useProduct.hook";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation } from "react-query";
import { generateAiListing } from "@/services/products/product-service";


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
  const [preview, setPreview] = useState<string>("");



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
      setPreview(URL.createObjectURL(file));
    } else {
      setErrorMessage(newErrorMessage);
    }
  };

  const generateListingMutation = useMutation({
    mutationFn: generateAiListing,
    onSuccess: ( data: any ) => {
      form.setValue("productName", data?.data?.title);
      form.setValue("productDescription", data?.data?.description);
      showToast(TOAST_TYPES.success, "Product details generated successfully");
    },
    onError: (error: any) => {
      if (error) {
        showToast(TOAST_TYPES.error, error?.message || "Something went wrong");
      } else {
        showToast(TOAST_TYPES.error, "Something went wrong");
      }
    },
  });

  const generateFromImage = (image: any) => {
    const formData = new FormData();
    formData.append("productImage", image);
    generateListingMutation.mutate(formData);
  };
  console.log("===> form", form.getValues());
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
                  <div className="flex gap-3">
                    {/* Upload Image section (col-8) */}
                    <div className="flex-1 md:flex-[2_2_0%]">
                      <div
                        className="min-h-[214px] flex flex-col justify-center"
                        // min-h = py-9 (36px top + 36px bottom padding) + 150px (image min-height)
                      >
                        {preview ? (
                          <div className="w-full h-full relative py-9 px-6 bg-slate-100 flex items-center justify-center rounded-md min-h-[214px]">
                            <Image
                              src={preview}
                              alt="preview"
                              className="object-cover rounded-md h-[150px] w-[150px]"
                              width={100}
                              height={100}
                            />
                            <button
                              type="button"
                              className="absolute top-[-10px] right-[-10px] bg-red-500 rounded-full p-2"
                              onClick={() => setPreview("")}
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div
                              className="flex flex-1 flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-md py-9 px-6 transition-shadow hover:shadow-outline focus-within:border-primary cursor-pointer bg-gray-50 min-h-[214px]"
                              onClick={() => fileInputRef.current?.click()}
                              tabIndex={0}
                              style={{ minHeight: 150 }}
                              role="button"
                            >
                              <svg height="34" width="34" viewBox="0 0 24 24" fill="none" className="mb-1 text-gray-400">
                                <path d="M12 16v-8M12 8l-4 4M12 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                              </svg>
                              <div className="text-gray-600 text-center font-medium">
                                Drop product image here or <span className="text-primary underline cursor-pointer">browse</span>
                              </div>
                              <div className="text-xs text-gray-400 mt-2">
                                Supports: JPG, PNG (max 5MB)
                              </div>
                              <input
                                id="fileInput"
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/gif"
                                onChange={handleFileChange}
                                className="hidden"
                                tabIndex={-1}
                              />
                              {errorMessage && (
                                <p className="text-sm text-destructive mt-2">{errorMessage}</p>
                              )}
                            </div>
                          </>
                        )}
                      </div>
            
                    </div>
                    {/* Generate Details with AI section (col-4) */}
                    <div className="flex-1 md:flex-[1_1_0%] bg-[#FFF8E5] border border-[#FFF2CC] rounded-md px-6 py-5 flex flex-col gap-2 max-w-xs  align-middle justify-center">
                      <div className="flex items-center gap-2 text-[#E3AA13] font-semibold">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M12 17V13M12 13V7M12 7H17M12 7H7" stroke="#E3AA13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="10" stroke="#FFD600" strokeWidth="0.8" />
                        </svg>
                        Generate details with AI
                      </div>
                      <div className="text-xs text-gray-600 mb-2 text-ellipsis">
                        Upload an image to suggest a name, description and tags.
                      </div>
                      <Button
                        type="button"
                      
                        onClick={() => generateFromImage(form.getValues("productImage"))}
                        className="inline-flex items-center px-3 py-2 bg-[#d6b73a] text-[#BBA13A] rounded-md text-sm font-medium border border-[#FFE38D] w-full"
                        disabled={preview ? false : true}
                        loading={generateListingMutation.isLoading}
                      >
                        <Sparkles className="w-4 h-4 mr-2 text-white" />
                        <span className="text-white"> Generate details</span>
                      </Button>
                    </div>
                  </div>
            
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

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
            </div>
          
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
