"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGetAllRoles } from "../hooks/useGetAllRoles";
import { Role } from "../types/uniform.types";
import { useSession } from "next-auth/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

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
    hover: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
};

const textVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { opacity: 0, transition: { duration: 0.2 } },
};

const bannerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { opacity: 0, transition: { duration: 0.2 } },
};

const overlayVariants: Variants = {
    hidden: { 
        opacity: 0, 
        scale: 0.95,
        transition: { duration: 0.2 } 
    },
    hover: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
};



const Uniforms = () => {
    const router = useRouter();

    const { data: session, status } = useSession();
    const accessToken = session?.accessToken || "";

    const {
        data: rolesData,
        isLoading: isLoadingRoles,
        error: rolesError
    } = useGetAllRoles(accessToken);

    const isUnauthenticated = status === "unauthenticated";

    // Handle role click - navigates to the role's product page
    const handleRoleClick = (roleId: string) => {
        if (isUnauthenticated) return;
        router.push(`/uniforms/${roleId}`);
    };

    // Define content to render based on roles loading state
    let renderRolesContent;

    if (isLoadingRoles) {
        renderRolesContent = (
            <div className="text-center py-12">
                <p className="text-gray-600">Loading roles...</p>
            </div>
        );
    } else if (rolesError) {
        renderRolesContent = (
            <div className="text-center py-12">
                <p className="text-red-600">Error loading roles: {rolesError.message}</p>
            </div>
        );
    } else {
        renderRolesContent = (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
                {rolesData?.data.map((role: Role) => (
                    <motion.div
                        key={role._id}
                        variants={cardVariants}
                        whileHover="hover"
                        onClick={() => handleRoleClick(role._id)}
                        className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-square flex items-center justify-center p-8 bg-gray-50/50">
                            <div className="relative w-full h-full">
                                <Image
                                    src={role.images || "/images/uniforms/placeholder.png"}
                                    alt={role.roleTitle}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Selected/Hover Overlay */}
                            <motion.div
                                variants={overlayVariants}
                                initial="hidden"
                                className="absolute inset-0 bg-white/80 flex items-center justify-center p-4 z-10"
                            >
                                <span className="text-2xl font-bold text-gray-900 border-2 border-primary/20 bg-white/40 backdrop-blur-sm px-6 py-2 rounded-xl shadow-sm">
                                    {role.roleTitle}
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
                                {role.roleTitle}
                            </motion.span>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        );
    }

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
                        What is your Job/Role?
                        {/* Find By Your Role */}
                    </motion.h1>
                </div>

                {/* Roles Grid Content */}
                {renderRolesContent}
            </div>

            {/* Login Popup Modal */}
            <Dialog open={isUnauthenticated}>
                <DialogContent 
                    className="sm:max-w-md bg-white border-2 border-primary/20 shadow-2xl rounded-3xl p-8"
                    showCloseButton={false}
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader className="flex flex-col items-center gap-6 text-center">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                            <LogIn className="w-10 h-10 text-green-500" />
                        </div>
                        <DialogTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            You are not Logged In
                        </DialogTitle>
                        <DialogDescription className="text-lg text-gray-600 max-w-[280px] leading-relaxed">
                            Please log in to your account to view and purchase uniforms.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <DialogFooter className="sm:justify-center mt-8">
                        <Button 
                            onClick={() => router.push("/login")}
                            className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-7 px-10 rounded-2xl shadow-lg shadow-primary/20 transform transition-all active:scale-95 group"
                        >
                            Take me to Login
                            <LogIn className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Uniforms;