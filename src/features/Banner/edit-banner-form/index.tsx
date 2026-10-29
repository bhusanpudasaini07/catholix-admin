import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useBanners } from "@/hooks/banners/useBanners.hooks";
import { BannerFormSchema } from "@/schema/banner-schema";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Switch } from "@/shared/components/ui/switch";
import { Textarea } from "@/shared/components/ui/textarea";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { getBannerById } from "@/services/dashboard/dashboard-service";
import { useQuery } from "react-query";

const BANNER_WIDTH = 1024;
const BANNER_HEIGHT = 546;
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const EditBannerSchema = BannerFormSchema.extend({
  banner: z
    .custom<File | undefined>(
      (value) => value === undefined || value instanceof File
    )
    .optional(),
});

type BannerFormValues = z.infer<typeof EditBannerSchema>;

const getBannerRecord = (response: any) => {
  const body = response?.data;
  if (body?.data && typeof body.data === "object" && !Array.isArray(body.data)) {
    return body.data;
  }
  return body;
};

const getBannerImageUrl = (banner: any) => {
  const image =
    banner?.bannerImageUrl ||
    banner?.bannerUrl ||
    banner?.imageUrl ||
    banner?.bannerImage ||
    banner?.image ||
    banner?.banner;

  return typeof image === "string" ? image : "";
};

const EditBannerForm = () => {
  const router = useRouter();
  const bannerId = Array.isArray(router.query.bannerId)
    ? router.query.bannerId[0]
    : router.query.bannerId;

  const { editBannerMutation } = useBanners();
  const { data: bannerDetail, isLoading: bannerDetailLoading } = useQuery({
    queryKey: ["bannerById", bannerId],
    queryFn: () => getBannerById(bannerId as string),
    enabled: !!bannerId,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef("");
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);


  const form = useForm<BannerFormValues>({
    resolver: zodResolver(EditBannerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      isPublished: false,
    },
  });

  const loading = editBannerMutation.isLoading;

  const clearPreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }
    setPreview("");
    setFileName("");
    setErrorMessage("");
    form.setValue("banner", undefined as unknown as File);
    form.clearErrors("banner");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const validateFile = (file: File) =>
    new Promise<string>((resolve) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        resolve("Only JPG, JPEG, PNG, or WEBP images are allowed.");
        return;
      }

      if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
        resolve(`Maximum size allowed is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      const image = new window.Image();
      image.onload = () => {
        const { naturalWidth, naturalHeight } = image;
        URL.revokeObjectURL(objectUrl);
        if (naturalWidth < BANNER_WIDTH || naturalHeight < BANNER_HEIGHT) {
          resolve(
            `Banner must be at least ${BANNER_WIDTH} × ${BANNER_HEIGHT} pixels. This image is ${naturalWidth} × ${naturalHeight}.`
          );
          return;
        }
        resolve("");
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve("Could not read this image. Please choose another file.");
      };
      image.src = objectUrl;
    });

  const setBannerPreview = (file: File) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreview(url);
    setFileName(file.name);
    setErrorMessage("");
    form.setValue("banner", file, { shouldValidate: true });
  };

  const handleFile = async (file?: File) => {
    if (!file) return;

    const message = await validateFile(file);
    if (message) {
      setErrorMessage(message);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setBannerPreview(file);
  };

  useEffect(() => {
    const banner = getBannerRecord(bannerDetail);
    if (!banner) return;

    form.reset({
      title: banner.title ?? "",
      description: banner.description ?? "",
      isPublished: banner.isPublished === true || banner.isPublished === "true",
    });

    const imageUrl = getBannerImageUrl(banner);
    if (imageUrl) {
      setPreview(imageUrl);
      setFileName("Current banner");
    }
  }, [bannerDetail, form]);

  const onSubmit: SubmitHandler<BannerFormValues> = (data) => {
    if (!preview) {
      setErrorMessage("Please upload a banner image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description ?? "");
    formData.append("isPublished", String(data.isPublished));
    if (data.banner instanceof File) {
      formData.append("bannerImage", data.banner);
    }
    editBannerMutation.mutate(formData);
  };

  return (
    <Card>
      <CardContent>
        {bannerDetailLoading ? (
          <div className="max-w-[1024px] space-y-4">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="aspect-[1024/546] w-full" />
          </div>
        ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[1024px] space-y-4"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Banner title
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Banner title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Banner description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Published</FormLabel>
                  <FormControl>
                    <div>
                      <Switch
                        disabled={loading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-zinc-900">
                Banner image
                <span className="text-destructive">*</span>
              </p>
              <p className="mb-3 text-xs text-gray-500">
                At least {BANNER_WIDTH} × {BANNER_HEIGHT} pixels. JPG, PNG, or WEBP up to {MAX_FILE_SIZE_MB}MB. Leave the current image to keep it.
              </p>

              <div
                role="button"
                tabIndex={0}
                className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-8 text-center transition-shadow ${isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 bg-gray-50 hover:shadow-outline"
                  }`}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragOver(false);
                  void handleFile(event.dataTransfer.files?.[0]);
                }}
              >
                <Upload className="mb-2 h-6 w-6 text-gray-400" />
                <p className="font-medium text-gray-600">
                  Drop banner here or{" "}
                  <span className="text-primary underline">browse</span>
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Minimum size: {BANNER_WIDTH} × {BANNER_HEIGHT} px
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  className="hidden"
                  disabled={loading}
                  onChange={(event) => {
                    void handleFile(event.target.files?.[0]);
                  }}
                />
              </div>
              {errorMessage && (
                <p className="mt-2 text-sm text-destructive">{errorMessage}</p>
              )}
              <FormField
                control={form.control}
                name="banner"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-zinc-900">Preview</p>
              <div
                className="relative w-full overflow-hidden rounded-md border bg-slate-100"
                style={{ aspectRatio: `${BANNER_WIDTH} / ${BANNER_HEIGHT}` }}
              >
                {preview ? (
                  <>
                    {preview.startsWith("blob:") ? (
                      <Image
                        src={preview}
                        alt="Banner preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <img
                        src={preview}
                        alt="Banner preview"
                        className="h-full w-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      className="absolute right-3 top-3 rounded-full bg-red-500 p-2"
                      onClick={clearPreview}
                      aria-label="Remove banner"
                      disabled={loading}
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-400">
                    Banner preview appears here at {BANNER_WIDTH} × {BANNER_HEIGHT}.
                  </div>
                )}
              </div>
              {fileName && (
                <p className="mt-2 text-xs text-gray-500">
                  {fileName === "Current banner"
                    ? "Current banner"
                    : `${fileName} · at least ${BANNER_WIDTH} × ${BANNER_HEIGHT} px`}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading || bannerDetailLoading}
              >
                Update banner
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/banner")}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default EditBannerForm;
