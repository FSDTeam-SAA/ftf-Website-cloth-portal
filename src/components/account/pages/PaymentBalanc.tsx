"use client";

import React from "react";
import Image from "next/image";
import { useGetMyProfile } from "@/features/account/hooks/useGetMyProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const PaymentBalance = () => {
    const { data: profileResponse, isLoading } = useGetMyProfile();

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="space-y-3">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-[300px] w-full max-w-md rounded-[2.5rem]" />
            </div>
        );
    }

    const balance = profileResponse?.data?.balance || 0;
    const formattedBalance = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(balance);

    return (
        <div className="max-w-4xl space-y-10">
            {/* Header Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                        See your balance.
                    </h1>
                    {/* <p className="text-slate-500 mt-2 text-lg">
                        See your balance.
                    </p> */}
                </div>
                <div className="hidden md:block">
                     <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Account Active
                    </div>
                </div>
            </div>

            {/* Main Balance Card */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="relative group overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                    {/* Background Decorative Element */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-slate-50 rounded-full -z-10 transition-transform group-hover:scale-110" />
                    
                    <div className="flex items-center gap-3 mb-10">
                        <div className="p-3 bg-black rounded-2xl">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Available Balance</h2>
                    </div>

                    <div className="flex flex-col items-center py-4">
                        <div className="relative w-32 h-32 mb-6">
                            <Image
                                src="/images/icons/dollar-icon.png"
                                alt="Currency"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-6xl font-black text-slate-900 tracking-tighter">
                                {formattedBalance}
                            </p>
                            {/* <span>{userProfile?.data?.balance ?? 0}</span> */}
                            <p className="text-slate-400 font-medium mt-2 uppercase tracking-widest text-xs">
                                Total USD Balance
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Stats Section */}
                
            </div>
        </div>
    );
};

export default PaymentBalance;