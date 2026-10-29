import moment from "moment";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import { useOrders } from "@/hooks/orders/useOrders.hook";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "DELIVERED", label: "Delivered" },
];

const SHIPPING_LABELS: Record<string, { label: string; estimate: string }> = {
  standard: { label: "Standard shipping", estimate: "5–7 business days" },
  express: { label: "Express shipping", estimate: "1–2 business days" },
};

const formatMoney = (value: unknown) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return "AUD 0.00";
  }
  return `AUD ${amount.toFixed(2)}`;
};

const getOrderRecord = (response: any) => {
  const body = response?.data;
  if (body?.data && typeof body.data === "object" && !Array.isArray(body.data)) {
    return body.data;
  }
  return body;
};

const getCustomerName = (order: any) => {
  const userName = [order?.user?.firstName, order?.user?.lastName]
    .filter(Boolean)
    .join(" ");
  return userName || order?.guestName || "Guest customer";
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const ViewOrderDetails = () => {
  const router = useRouter();
  const { orderDetail, orderDetailLoading, updateOrderStatusMutation } =
    useOrders();
  const order = getOrderRecord(orderDetail);
  const items = Array.isArray(order?.items) ? order.items : [];

  const subtotal = items.reduce(
    (sum: number, item: any) =>
      sum + Number(item?.originalPrice || 0) * Number(item?.quantity || 0),
    0
  );
  const discount = items.reduce(
    (sum: number, item: any) =>
      sum + Number(item?.discountAmount || 0) * Number(item?.quantity || 0),
    0
  );
  const shippingFee = Number(order?.shippingFee || 0);
  const itemsTotal = Number(order?.totalAmount || 0);
  const grandTotal = itemsTotal + shippingFee;
  const shipping =
    SHIPPING_LABELS[String(order?.shippingMethod || "standard").toLowerCase()] ||
    SHIPPING_LABELS.standard;
  const customerName = getCustomerName(order);
  const email = order?.guestEmail || order?.user?.email || "-";
  const phone = order?.guestPhone || order?.user?.contactNumber || "-";
  const status = String(order?.orderStatus || "PENDING");
  const statusTone =
    status === "DELIVERED"
      ? "bg-green-500 border-green-200"
      : "bg-yellow-400 border-yellow-200";

  return (
    <Card>
      <CardContent>
        <div className="mb-6 flex items-center gap-2">
          <Button
            type="button"
            variant="outline_secondary"
            size="sm"
            className="!size-7 shrink-0 gap-2 rounded-full p-0 2xl:size-8"
            onClick={() => router.push("/orders")}
          >
            <ChevronLeft size={18} />
          </Button>
          <div>
            <h5 className="text-2xl font-bold text-zinc-900">
              {order?.id ? `#${order.id} Order` : "Order"}
            </h5>
            {order?.createdAt ? (
              <p className="text-sm text-zinc-500">
                Placed {moment(order.createdAt).format("DD/MM/YYYY hh:mm A")}
              </p>
            ) : null}
          </div>
        </div>

        {orderDetailLoading ? (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 space-y-4 lg:col-span-8">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Skeleton className="h-72 w-full" />
            </div>
          </div>
        ) : !order?.id ? (
          <p className="text-sm text-zinc-500">This order could not be found.</p>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 flex flex-col gap-4 lg:col-span-8">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center">
                    <span
                      className={`mr-2 inline-flex h-3 w-3 rounded-full border ${statusTone}`}
                    />
                    <span className="font-semibold text-slate-700">
                      {status.split("_").join(" ")}
                    </span>
                  </div>
                  <Select
                    value={status}
                    onValueChange={(value) =>
                      updateOrderStatusMutation.mutate(value)
                    }
                    disabled={updateOrderStatusMutation.isLoading}
                  >
                    <SelectTrigger className="h-9 w-[180px]">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent className="z-[999999] bg-white">
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {items.length ? (
                    items.map((item: any) => {
                      const hasDiscount = Number(item?.discountAmount) > 0;
                      return (
                        <div key={item.id} className="flex items-center gap-4">
                          {item?.product?.productImageUrl ? (
                            <img
                              src={item.product.productImageUrl}
                              alt={item?.product?.productName || "product"}
                              className="h-16 w-16 rounded-lg border object-cover"
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-slate-100 text-xs text-slate-400">
                              No image
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <div className="text-[15px] font-semibold text-gray-900">
                                  {item?.product?.productName || "Product"}
                                </div>
                                <div className="mt-1 text-xs text-gray-400">
                                  Quantity:{" "}
                                  <span className="text-gray-700">
                                    {item?.quantity}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                {hasDiscount ? (
                                  <div className="flex items-center justify-end gap-2">
                                    <span className="text-lg font-semibold text-red-500">
                                      {formatMoney(item.unitPrice)}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                      {formatMoney(item.originalPrice)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-700">
                                    {formatMoney(item.unitPrice || item.originalPrice)}
                                  </span>
                                )}
                                <div className="mt-1 font-medium text-gray-800">
                                  {formatMoney(item.totalPrice)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500">No products in this order.</p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold text-zinc-500">Delivery</div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-800">
                      {shipping.label}
                    </div>
                    <div className="text-xs text-gray-500">{shipping.estimate}</div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {shippingFee === 0 ? "Free" : formatMoney(shippingFee)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="mb-3 text-xs font-semibold text-zinc-500">
                  Payment summary
                </div>
                <div className="space-y-2 text-sm text-zinc-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>{discount > 0 ? `- ${formatMoney(discount)}` : formatMoney(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? "Free" : formatMoney(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-base font-semibold text-zinc-900">
                    <span>Total</span>
                    <span>{formatMoney(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col gap-6 rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-slate-100 text-xs font-semibold text-slate-700">
                      {getInitials(customerName) || "G"}
                    </div>
                    <div className="text-[15px] font-semibold text-gray-900">
                      {customerName}
                    </div>
                  </div>
                  <div className="mt-4 text-sm font-medium text-gray-700">
                    {order.totalItems || items.length} items
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-2 text-xs font-semibold text-zinc-500">
                    Contact info
                  </div>
                  <div className="mb-1 text-sm text-zinc-700">{email}</div>
                  <div className="text-sm text-zinc-700">{phone}</div>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-2 text-xs font-semibold text-zinc-500">
                    Delivery address
                  </div>
                  <div className="whitespace-pre-line text-sm text-zinc-700">
                    {order.deliveryAddress || "-"}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-2 text-xs font-semibold text-zinc-500">
                    Shipping address
                  </div>
                  <div className="whitespace-pre-line text-sm text-zinc-700">
                    {order.shippingAddress || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViewOrderDetails;
