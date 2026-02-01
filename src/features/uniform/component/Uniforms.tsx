"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

interface Role {
    title: string;
    image: string;
    selected?: boolean;
}

const roles: Role[] = [
    {
        title: "HIC",
        image: "/images/uniforms/green-hoodie.png",
    },
    {
        title: "Repair Tech",
        image: "/images/uniforms/black-jacket.png",
    },
    {
        title: "Bath Installer",
        image: "/images/uniforms/green-tshirt.png",
    },
    {
        title: "Full Line Installer",
        image: "/images/uniforms/green-hoodie.png",
        // selected: true,
    },
    {
        title: "Warehouse",
        image: "/images/uniforms/black-jacket.png",
    },
    {
        title: "Warranty Team",
        image: "/images/uniforms/green-tshirt.png",
    },
    {
        title: "Team Apparel",
        image: "/images/uniforms/green-hoodie.png",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    active: { y: -8, transition: { duration: 0.2 } },
};

const textVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    active: { y: 20, opacity: 0, transition: { duration: 0.2 } },
};

const bannerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    active: { opacity: 0, transition: { duration: 0.2 } },
};

const overlayVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 0, scale: 0.95 },
    active: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

const Uniforms = () => {
    return (
        <div className="bg-white min-h-screen py-12 px-6 lg:px-12">
            <div className="container mx-auto max-w-6xl">
                {/* Top Section: Welcome & How it works */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#F2F2F2] rounded-2xl p-10 flex flex-col justify-center min-h-[220px]"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Welcome</h2>
                        <p className="text-gray-600 text-[19px] leading-relaxed max-w-sm">
                            You are given allocated dollars to use towards your uniforms and
                            you can spend them here.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#FFD12E] rounded-2xl p-10 flex flex-col justify-center min-h-[220px]"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">How it works</h2>
                        <p className="text-[#1A1A1A] text-[19px] leading-relaxed font-semibold">
                            1) Add items to cart-2) Checkout with your store/company credits
                            3) Choose shipping address 4) We fulfill via PJSwag
                        </p>
                    </motion.div>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl font-bold text-gray-900"
                    >
                        What is your Job/role?
                    </motion.h1>
                </div>

                {/* Roles Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                >
                    {roles.map((role, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="active"
                            animate={role.selected ? "active" : "visible"}
                            className={cn(
                                "group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between",
                                role.selected && "ring-1 ring-gray-100"
                            )}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square flex items-center justify-center p-8 bg-gray-50/50">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={role.image}
                                        alt={role.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                {/* Selected/Hover Overlay */}
                                <motion.div
                                    variants={overlayVariants}
                                    className="absolute inset-0 bg-white/80 flex items-center justify-center p-4 z-10"
                                >
                                    <span className="text-2xl font-bold text-gray-900 border-2 border-primary/20 bg-white/40 backdrop-blur-sm px-6 py-2 rounded-xl shadow-sm">
                                        {role.title}
                                    </span>
                                </motion.div>
                            </div>

                            {/* Footer Banner */}
                            <motion.div
                                variants={bannerVariants}
                                className="bg-[#56C383] py-5 px-4 text-center overflow-hidden"
                            >
                                <motion.span
                                    variants={textVariants}
                                    className="block text-white font-bold text-lg tracking-wide uppercase"
                                >
                                    {role.title}
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Uniforms;