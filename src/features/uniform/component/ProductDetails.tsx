"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetProductById } from "../hooks/useGetProductById";
import { useSession } from "next-auth/react";
import { useAddToCart } from "../../addtocart/hooks/useAddtoCart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductDetailsProps {
    productId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const {
        mutate: addToCart,
        isPending: isAddingToCart
    } = useAddToCart();

    const {
        data: productByIdData,
        isLoading: isLoadingProductById,
        error: productByIdError
    } = useGetProductById(productId);

    // Initial dummy data for sizes if not present in API
    const sizes = productByIdData?.data?.size
        ? productByIdData.data.size.split(',').map(s => s.trim())
        : ["S", "M", "L", "XL", "XXL", "XXXL"];

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    if (isLoadingProductById) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Loading product details...</p>
            </div>
        );
    }

    if (productByIdError || !productByIdData?.data) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Error loading product details</p>
            </div>
        );
    }

    const product = productByIdData.data;

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast("Please select a size");
            return;
        }

        const payload = {
            userId: session?.user?.id || "",
            products: [
                {
                    productId: product._id,
                    quantity: quantity,
                    size: selectedSize
                }
            ],
            totalPrice: product.price * quantity
        };

        console.log("Adding to cart payload:", JSON.stringify(payload, null, 2));

        addToCart(payload, {
            onSuccess: () => {
                router.push("/checkout");
            }
        });
    };

    const handleClear = () => {
        setSelectedSize(null);
        setQuantity(1);
    };

    return (
        <div className="bg-white min-h-screen py-12 px-6 lg:px-12">
            <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="bg-[#FAF9F6] rounded-3xl p-12 flex items-center justify-center">
                        <div className="relative w-full aspect-square">
                            <Image
                                src={
                                    typeof product.image === 'string'
                                        ? product.image
                                        : product.image?.url || "/images/uniforms/placeholder.png"
                                }
                                alt={product.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <span className="text-gray-400 mb-2 uppercase tracking-wide text-sm">{product.type || "Uniforms"}</span>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
                        <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 mb-3">Size :</h3>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={cn(
                                            "w-12 h-12 cursor-pointer rounded border flex items-center justify-center font-medium transition-colors",
                                            selectedSize === size
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-gray-900 border-gray-200 hover:border-black"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-1 hover:text-black transition-colors"
                            >
                                Clear <span>×</span>
                            </button>
                            <span>|</span>
                            <span className={cn(
                                product.availableQuantity > 0 ? "text-green-600" : "text-red-600 font-medium"
                            )}>
                                {product.availableQuantity > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center border border-gray-300 rounded px-4 py-3 w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-2 text-xl font-medium"
                                >
                                    -
                                </button>
                                <span className="mx-4 font-bold min-w-[20px] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-2 text-xl font-medium"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className="bg-black cursor-pointer text-white font-bold py-3 px-12 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                            >
                                {isAddingToCart ? "Adding..." : "Add to Cart"}
                            </button>

                            <div className="flex flex-col justify-center">
                                <span className="text-gray-400 text-xs uppercase tracking-wider">Total Price</span>
                                <span className="text-2xl font-bold text-gray-900">${(product.price * quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
