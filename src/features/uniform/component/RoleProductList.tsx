"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGetProductByRole } from "../hooks/useGetProductByRole";
import { useSession } from "next-auth/react";

interface RoleProductListProps {
    role: string;
}

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

const RoleProductList: React.FC<RoleProductListProps> = ({ role }) => {
    const router = useRouter();
    const { data: session } = useSession();
    // TODO: Replace with actual access token from your auth system
    const accessToken = session?.accessToken || "";

    const {
        data: productsByRoleData,
        isLoading: isLoadingProductsByRole,
        error: productsByRoleError
    } = useGetProductByRole(accessToken, role);

    const handleProductClick = (productId: string) => {
        router.push(`/uniforms/product/${productId}`);
    };

    if (isLoadingProductsByRole) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Loading products...</p>
            </div>
        );
    }

    if (productsByRoleError) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Error loading products: {productsByRoleError.message}</p>
            </div>
        );
    }

    if (!productsByRoleData?.data || productsByRoleData.data.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">No products found for this role.</p>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-12 px-6 lg:px-12">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Catalog</h1>
                    <p className="text-gray-500">Choice your favourite items</p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {productsByRoleData.data.map((product) => (
                        <motion.div
                            key={product._id}
                            variants={cardVariants}
                            whileHover="active"
                            onClick={() => handleProductClick(product._id)}
                            className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                        >
                            <div className="relative aspect-square bg-gray-50/50">
                                <Image
                                    src={
                                        typeof product.image === 'string'
                                            ? product.image
                                            : product.image?.url || "/images/uniforms/placeholder.png"
                                    }
                                    alt={product.title}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.title}</h3>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-gray-900 font-bold text-xl">${product.price}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default RoleProductList;
