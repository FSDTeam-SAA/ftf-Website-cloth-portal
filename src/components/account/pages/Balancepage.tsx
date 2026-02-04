"use client";

import React from 'react'
import ProfileCard from './ProfileCard';
import PaymentBalanc from './PaymentBalanc';

const Balancepage = () => {
    return (
        <div className="min-h-screen bg-transparent py-10 animate-in fade-in duration-700">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
                {/* Left Sidebar - Profile Card */}
                <div className="w-full lg:w-auto shrink-0 flex justify-center">
                    <ProfileCard />
                </div>

                {/* Right Content - balance page */}
                <div className="flex-1 w-full bg-white rounded-[2rem] p-10 lg:p-12 shadow-sm border border-gray-100 min-h-[600px]">
                    <PaymentBalanc />
                </div>

            </div>
        </div>
    );
};

export default Balancepage