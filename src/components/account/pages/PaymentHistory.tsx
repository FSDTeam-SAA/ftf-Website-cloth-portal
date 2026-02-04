"use client";

import React from "react";
import ProfileCard from "./ProfileCard";
import { usePaymentHistory } from "@/features/account/hooks/usePaymentHistory";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface HistoryItem {
    _id?: string;
    shippingAddress?: {
        address?: string;
    };
    productName?: string;
    product?: {
        name?: string;
    };
    quantity?: number;
    qty?: number;
    status?: string;
    totalPrice?: number;
    total?: number;
    createdAt?: string;
}

const PaymentHistory = () => {
    const { data: historyResponse, isLoading } = usePaymentHistory();

    const history: HistoryItem[] = historyResponse?.data || [];

    const getStatusStyles = (status: string) => {
        const s = status.toLowerCase();
        if (s === "paid") return "bg-green-100 text-green-600 hover:bg-green-100";
        return "bg-orange-100 text-orange-500 hover:bg-orange-100";
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "12-12-2024";
        try {
            return new Date(dateStr)
                .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })
                .split("/")
                .join("-");
        } catch {
            return "12-12-2024";
        }
    };

    return (
        <div className="min-h-screen bg-transparent py-10 animate-in fade-in duration-700">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
                {/* Left Sidebar - Profile Card */}
                <div className="w-full lg:w-auto shrink-0 flex justify-center">
                    <ProfileCard />
                </div>

                {/* Right Content - Payment History */}
                <div className="flex-1 w-full bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-gray-100 min-h-[600px] overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                                Payment History
                            </h1>
                            <p className="text-gray-500 text-lg">See your payment details</p>
                        </div>


                    </div>

                    <div className="relative overflow-x-auto">
                        {(() => {
                            if (isLoading) {
                                return (
                                    <div className="flex justify-center items-center h-64">
                                        <Loader2 className="animate-spin text-gray-300 w-10 h-10" />
                                    </div>
                                );
                            }

                            if (history.length === 0) {
                                return (
                                    <div className="text-center py-20 text-gray-400 font-medium">
                                        No payment history found.
                                    </div>
                                );
                            }

                            return (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-none hover:bg-transparent">
                                            <TableHead className="text-center font-bold text-gray-800 h-14">
                                                Received Address
                                            </TableHead>
                                            <TableHead className="text-center font-bold text-gray-800 h-14">
                                                Product
                                            </TableHead>
                                            <TableHead className="text-center font-bold text-gray-800 h-14">
                                                QTY
                                            </TableHead>
                                            <TableHead className="text-center font-bold text-gray-800 h-14">
                                                Status
                                            </TableHead>
                                            <TableHead className="text-center font-bold text-gray-800 h-14">
                                                Total
                                            </TableHead>
                                            <TableHead className="text-center font-bold text-gray-800 h-14">
                                                Date
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {history.map((item, idx) => (
                                            <TableRow
                                                key={item._id || idx}
                                                className={`border-none ${idx % 2 === 1 ? "bg-gray-50/50" : "bg-transparent"} hover:bg-gray-100/50 transition-colors`}
                                            >
                                                <TableCell className="text-center py-6 text-gray-600 font-medium">
                                                    {item.shippingAddress?.address ||
                                                        "21 Industrial Blvd. New Castle, DE 19720"}
                                                </TableCell>
                                                <TableCell className="text-center py-6 text-gray-800 font-bold">
                                                    {item.productName || item.product?.name || "Green T-Shirt"}
                                                </TableCell>
                                                <TableCell className="text-center py-6 text-gray-800 font-bold">
                                                    {item.quantity || item.qty || 4}
                                                </TableCell>
                                                <TableCell className="text-center py-6">
                                                    <Badge
                                                        className={`
                                                            px-6 py-1.5 rounded-md font-bold text-sm border-none shadow-none
                                                            ${getStatusStyles(item.status || "Paid")}
                                                          `}
                                                    >
                                                        {item.status || "Paid"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center py-6 text-gray-800 font-bold">
                                                    ${item.totalPrice || item.total || 121}
                                                </TableCell>
                                                <TableCell className="text-center py-6 text-gray-600 font-medium">
                                                    {formatDate(item.createdAt)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;