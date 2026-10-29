import { useOrders } from '@/hooks/orders/useOrders.hook';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react'

const ViewOrderDetails = () => {

    const router = useRouter();
    const { orderDetail } = useOrders();
    return (
        <Card>
            <CardContent>
                <div className="breads">
                    <div className="flex  items-center mb-6 gap-2">
                        <Button
                            type="button"
                            variant="outline_secondary"
                            size="sm"
                            className="gap-2 p-0 rounded-full !size-7 2xl:size-8 shrink-0"
                            onClick={() => {
                                router.push("/orders");
                            }}
                        >
                            <ChevronLeft size={18} />
                        </Button>
                        <h5 className="text-2xl font-bold text-zinc-900">
                            #{orderDetail?.data?.id} Order
                        </h5>
                    </div>
                </div>

                <div className="grid grid-cols-12  gap-6">
                    <div className="col-span-8">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Section (Order / Products / Summary) */}
                            <div className="flex-1 flex flex-col gap-4">
                                {/* Pending Section */}
                                <div className="bg-white rounded-lg shadow-sm border p-4">
                                    <div className="flex items-center mb-3">
                                        <span className="inline-flex h-3 w-3 rounded-full bg-yellow-400 mr-2 border border-yellow-200"></span>
                                        <span className="font-semibold text-slate-700">{orderDetail?.data?.orderStatus.toUpperCase()}</span>
                                    </div>
                                    {/* Product Items */}
                                    <div className="space-y-4">
                                        {/* Product Item 1 */}
                                        {orderDetail?.data?.items?.map((items: any) => (
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={items?.product?.productImageUrl}
                                                    alt="product"
                                                    className="rounded-lg border w-16 h-16 object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 justify-between">
                                                        <div>
                                                            <div className="font-semibold text-[15px] text-gray-900">
                                                                {items?.product?.productName}
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-1">quantity: <span className="text-gray-700">{items?.quantity}</span></div>
                                                            {/* <div className="text-xs text-gray-400">Size: <span className="text-gray-700">Black</span></div> */}
                                                        </div>
                                                        <div className="text-right">
                                                            {items?.product?.hasDiscount ?
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-red-500 font-semibold text-lg">
                                                                        AUD {items?.product?.productPrice - (items?.product?.productPrice * items?.product?.discountPercentage / 100)}
                                                                        </span>
                                                                    <span className="text-gray-400 text-sm line-through">AUD {items?.product?.productPrice}</span>
                                                                </div>
                                                                :
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-gray-400 text-sm">${items?.product?.productPrice}</span>
                                                                </div>
                                                            }
                                                            <div className="text-gray-800 font-medium mt-1">AUD {items?.totalPrice}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                {/* Delivery Section */}
                                <div className="bg-white rounded-lg shadow-sm border p-4">
                                    {/* <div className="flex items-center gap-3">
                                        <img
                                            src="https://brandslogos.com/wp-content/uploads/images/large/fedex-logo.png"
                                            alt="Fedex"
                                            className="w-8 h-8 rounded"
                                        />
                                        <span className="font-semibold text-gray-800">FedEx</span>
                                        <span className="text-xs text-gray-500 ml-2">First class package</span>
                                        <span className="ml-auto font-semibold text-gray-900">${"20.00"}</span>
                                    </div> */}
                                </div>

                                {/* Payment Summary Section */}
                                <div className="bg-white rounded-lg shadow-sm border p-4">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col gap-6">
                            {/* Customer Header */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://randomuser.me/api/portraits/women/44.jpg"
                                            alt="User Avatar"
                                            className="w-9 h-9 rounded-full object-cover border"
                                        />
                                        <div>
                                            <div className="font-semibold text-[15px] text-gray-900">{orderDetail?.data?.user?.firstName} {orderDetail?.data?.guestName}</div>
                                        </div>
                                    </div>
                                    <button className="text-zinc-400 hover:text-zinc-600 transition">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <svg width="18" height="18" fill="none" stroke="#3574fb" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" stroke="currentColor" /><path d="M12 8v8" stroke="currentColor" /><path d="M8 12h8" stroke="currentColor"/></svg>
                                    <span className="font-medium text-gray-700 text-sm">{orderDetail?.data?.totalItems} Orders</span>
                                </div>
                            </div>
                            {/* Contact Info */}
                            <div className="border-t pt-4">
                                <div className="text-xs text-zinc-500 font-semibold mb-2">Contact info</div>
                                <div className="flex items-center gap-2 text-sm mb-1 text-zinc-700">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V4z" /><path d="M4 4l8 8 8-8" /></svg>
                                    {orderDetail?.data?.guestEmail}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-700">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V21a2 2 0 01-2.18 2 19.72 19.72 0 01-8.61-3.07A19.51 19.51 0 013 6.18 2 2 0 015 4h4.09A2 2 0 0110 6.18a16 16 0 009.09 9.09A2 2 0 0122 16.92z" /></svg>
                                    {orderDetail?.data?.guestPhone}
                                </div>
                            </div>
                            {/* Shipping Address */}
                            <div className="border-t pt-4">
                                <div className="text-xs text-zinc-500 font-semibold mb-2">Shipping Adress</div>
                                <div className="text-sm text-zinc-700">
                                    {orderDetail?.data?.guestName}
                                    <br />
                                    {orderDetail?.data?.guestPhone}
                                    <br />
                                    {orderDetail?.data?.deliveryAddress}
                                    <br />
                                   Australia
                                </div>
                            </div>
                            
                        </div>
                  
                       
                    </div>
                </div>




            </CardContent>
        </Card>
    )
}

export default ViewOrderDetails