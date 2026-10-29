import { useQuery } from "react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { IBundlePayload } from "@/interface/bundle-interface";
import { BundleFormValues } from "@/schema/bundle-schema";
import { getAllProducts } from "@/services/products/product-service";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
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
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Textarea } from "@/shared/components/ui/textarea";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

interface IProps {
  form: UseFormReturn<BundleFormValues>;
  loading: boolean;
  showSkeleton?: boolean;
  submitLabel: string;
  onSubmit: (event?: React.BaseSyntheticEvent) => void;
}

const getProductItems = (response: any) => {
  const body = response?.data;
  if (Array.isArray(body?.items)) return body.items;
  if (Array.isArray(body?.data?.items)) return body.data.items;
  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body)) return body;
  return [];
};

export const toBundlePayload = (data: BundleFormValues): IBundlePayload => ({
  name: data.name.trim(),
  description: data.description?.trim() || undefined,
  fixedPrice: Number(data.fixedPrice),
  imageUrl: data.imageUrl?.trim() || undefined,
  stockQuantity: Number(data.stockQuantity),
  status: data.status ?? "draft",
  items: data.items.map((item) => ({
    productId: Number(item.productId),
    quantity: Number(item.quantity),
  })),
});

const BundleFormContent = ({
  form,
  loading,
  showSkeleton = false,
  submitLabel,
  onSubmit,
}: IProps) => {
  const router = useRouter();
  const [productSearch, setProductSearch] = useState("");
  const imageUrl = form.watch("imageUrl");

  const { data: productResponse, isLoading: productsLoading } = useQuery({
    queryKey: ["products-for-bundles"],
    queryFn: () => getAllProducts("", 1, 100),
  });

  const products = getProductItems(productResponse);
  const filteredProducts = products.filter((product: any) =>
    String(product?.productName || product?.title || "")
      .toLowerCase()
      .includes(productSearch.trim().toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        {showSkeleton ? (
          <div className="max-w-[1024px] space-y-4">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="max-w-[1024px] space-y-4"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Bundle name
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Bundle name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fixedPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Fixed price
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Stock quantity
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Status</FormLabel>
                    <Select
                      value={field.value || "draft"}
                      onValueChange={field.onChange}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[999999] bg-white">
                        {STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Bundle description"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Image URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="https://example.com/bundle.jpg"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Bundle preview"
                className="h-40 w-40 rounded-md border object-cover"
              />
            ) : null}

            <FormField
              control={form.control}
              name="items"
              render={({ field }) => {
                const selectedItems = field.value ?? [];
                return (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Products
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      value={productSearch}
                      onChange={(event) => setProductSearch(event.target.value)}
                      placeholder="Search products"
                      disabled={loading || productsLoading}
                    />
                    <div className="max-h-72 space-y-2 overflow-y-auto rounded-md border p-3">
                      {productsLoading ? (
                        <Skeleton className="h-10 w-full" />
                      ) : filteredProducts.length ? (
                        filteredProducts.map((product: any) => {
                          const productId = Number(product.id);
                          const selected = selectedItems.find(
                            (item) => Number(item.productId) === productId
                          );
                          return (
                            <div
                              key={productId}
                              className="flex items-center justify-between gap-3 text-sm"
                            >
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  variant="primary"
                                  checked={Boolean(selected)}
                                  disabled={loading}
                                  onCheckedChange={(value) => {
                                    if (value) {
                                      field.onChange([
                                        ...selectedItems,
                                        { productId, quantity: 1 },
                                      ]);
                                      return;
                                    }
                                    field.onChange(
                                      selectedItems.filter(
                                        (item) =>
                                          Number(item.productId) !== productId
                                      )
                                    );
                                  }}
                                />
                                <span>
                                  {product.productName ||
                                    product.title ||
                                    productId}
                                </span>
                              </label>
                              {selected ? (
                                <Input
                                  type="number"
                                  min="1"
                                  step="1"
                                  className="w-24"
                                  disabled={loading}
                                  value={selected.quantity}
                                  onChange={(event) => {
                                    const quantity = Number(event.target.value);
                                    field.onChange(
                                      selectedItems.map((item) =>
                                        Number(item.productId) === productId
                                          ? { ...item, quantity }
                                          : item
                                      )
                                    );
                                  }}
                                  aria-label={`Quantity for ${product.productName || productId}`}
                                />
                              ) : null}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-gray-500">No products found.</p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
              >
                {submitLabel}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/bundles")}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default BundleFormContent;
