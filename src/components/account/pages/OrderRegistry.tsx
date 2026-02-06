// features/account/pages/OrderRegistry.tsx
"use client";

import React from "react";
import ProfileCard from "./ProfileCard";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMyOrder } from "@/features/order/hooks/useGetMyOrder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Updated Interface based on API Response
interface Product {
  _id: string;
  productId: {
    _id: string;
    title: string;
    price: number;
  };
  quantity: number;
  size: string;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    region: string;
  };
  totalAmount: number;
  remainingBalance: number;
  region: string;
  products: Product[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

const OrderRegistry = () => {
  const {
    data: ordersData,
    isLoading,
    error,
  } = useGetMyOrder();

  // API typical returns { success: true, data: [...] }
  const orders: Order[] = ordersData?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading orders. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-10 animate-in fade-in duration-700">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Sidebar - Profile Card */}
        <div className="w-full lg:w-auto shrink-0 flex justify-center">
          <ProfileCard />
        </div>

        {/* Right Content - Order History Table */}
        <div className="flex-1 w-full bg-white rounded-[2rem] p-10 lg:p-12 shadow-sm border border-gray-100 min-h-[600px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                Order Registry
              </h1>
              <p className="text-gray-500">See your order details and payment history</p>
            </div>

            {/* Export Actions */}
            <div className="flex gap-2 text-sm">
              <Button
                variant="outline"
                className="h-10 rounded-lg font-bold border-gray-200 text-gray-600 gap-2"
              >
                Export
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-lg font-bold border-gray-200 text-gray-600"
              >
                CSV
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-lg font-bold border-gray-200 text-gray-600"
              >
                Pdf
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="py-6 font-bold text-gray-900 w-[200px]">
                    Received Address
                  </TableHead>
                  <TableHead className="py-6 font-bold text-gray-900">
                    Product
                  </TableHead>
                  <TableHead className="py-6 font-bold text-gray-900">
                    QTY
                  </TableHead>
                  <TableHead className="py-6 font-bold text-gray-900">
                    Status
                  </TableHead>
                  <TableHead className="py-6 font-bold text-gray-900">
                    Total
                  </TableHead>
                  <TableHead className="py-6 font-bold text-gray-900 text-right pr-6">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => {
                    const mainProduct = order.products?.[0];
                    const productTitle =
                      mainProduct?.productId?.title || "Uniform Bundle";
                    const qty =
                      order.products?.reduce((acc, p) => acc + p.quantity, 0) ||
                      0;

                    return (
                      <TableRow
                        key={order._id}
                        className="hover:bg-gray-50/50 border-gray-100 group transition-colors"
                      >
                        <TableCell className="py-6 font-medium text-gray-500 text-xs">
                          <div className="max-w-[180px] break-words line-clamp-2">
                            {order.region || "Order Location"}
                          </div>
                        </TableCell>
                        <TableCell className="py-6 font-bold text-gray-900">
                          {productTitle}
                          {order.products.length > 1 && (
                            <span className="text-xs font-normal text-gray-400 ml-2">
                              +{order.products.length - 1} more
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-6 font-medium text-gray-500">
                          {qty}
                        </TableCell>
                        <TableCell className="py-6">
                          <Badge
                            variant="secondary"
                            className={`
                                    rounded-md px-3 py-1 font-bold capitalize shadow-none border-0
                                    ${order.status === "paid" || order.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : order.status === "pending" || order.status === "unpaid"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"}
                                `}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-6 font-bold text-gray-900">
                          ${order.totalAmount || 0}
                        </TableCell>
                        <TableCell className="py-6 font-medium text-gray-500 text-right pr-6">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-40 text-center text-gray-500"
                    >
                      No order record found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRegistry;
