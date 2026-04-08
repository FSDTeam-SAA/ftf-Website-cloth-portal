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
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const {
    data: productByIdData,
    isLoading: isLoadingProductById,
    error: productByIdError,
  } = useGetProductById(productId);

  // Initial dummy data for sizes if not present in API
  const sizes = productByIdData?.data?.size
    ? productByIdData.data.size.split(",").map((s) => s.trim())
    : ["S", "M", "L", "XL", "XXL", "XXXL"];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFitCut, setSelectedFitCut] = useState<string | null>(null);
  const [selectedFabricMaterial, setSelectedFabricMaterial] = useState<
    string | null
  >(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
  const selectedImage =
    product.images[selectedImageIndex] || product.images[0] || null;
  const fitCuts = product.fit_cut
    ? product.fit_cut
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
  const fabricMaterials = product.fabric_material
    ? product.fabric_material
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast("Please select a size");
      return;
    }

    if (fitCuts.length > 0 && !selectedFitCut) {
      toast("Please select a fit cut");
      return;
    }

    if (fabricMaterials.length > 0 && !selectedFabricMaterial) {
      toast("Please select a fabric material");
      return;
    }

    const payload = {
      userId: session?.user?.id || "",
      products: [
        {
          productId: product._id,
          quantity: quantity,
          size: selectedSize,
          ...(selectedFitCut ? { fit_cut: selectedFitCut } : {}),
          ...(selectedFabricMaterial
            ? { fabric_material: selectedFabricMaterial }
            : {}),
        },
      ],
      totalPrice: product.price * quantity,
    };

    console.log("Adding to cart payload:", JSON.stringify(payload, null, 2));

    addToCart(payload, {
      onSuccess: () => {
        router.push("/checkout");
      },
    });
  };

  const handleClear = () => {
    setSelectedSize(null);
    setSelectedFitCut(null);
    setSelectedFabricMaterial(null);
    setQuantity(1);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div>
            <div className="bg-[#FAF9F6] rounded-3xl p-12 flex items-center justify-center">
              <div className="relative w-full aspect-square">
                <Image
                  src={selectedImage?.url || "/images/uniforms/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex flex-wrap gap-4 mt-5">
                {product.images.map((image, index) => (
                  <button
                    key={image._id || image.url}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative w-20 h-20 rounded-xl overflow-hidden border bg-[#FAF9F6] transition-colors",
                      selectedImageIndex === index
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400",
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <span className="text-gray-400 mb-2 uppercase tracking-wide text-sm">
              {product.type || "Uniforms"}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price}
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
                        : "bg-white text-gray-900 border-gray-200 hover:border-black",
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
              <span
                className={cn(
                  product.availableQuantity > 0
                    ? "text-green-600"
                    : "text-red-600 font-medium",
                )}
              >
                {product.availableQuantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {(fitCuts.length > 0 || fabricMaterials.length > 0) && (
              <div className="mb-6 space-y-5">
                {fitCuts.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Fit Cut :</h3>
                    <div className="flex flex-wrap gap-3">
                      {fitCuts.map((fitCut, index) => (
                        <button
                          key={`${fitCut}-${index}`}
                          type="button"
                          onClick={() => setSelectedFitCut(fitCut)}
                          className={cn(
                            "h-12 px-4 rounded border flex items-center justify-center font-medium transition-colors",
                            selectedFitCut === fitCut
                              ? "bg-black text-white border-black"
                              : "bg-white text-gray-900 border-gray-200 hover:border-black",
                          )}
                        >
                          {fitCut}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {fabricMaterials.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Fabric Material :
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {fabricMaterials.map((material, index) => (
                        <button
                          key={`${material}-${index}`}
                          type="button"
                          onClick={() => setSelectedFabricMaterial(material)}
                          className={cn(
                            "h-12 px-4 rounded border flex items-center justify-center font-medium transition-colors",
                            selectedFabricMaterial === material
                              ? "bg-black text-white border-black"
                              : "bg-white text-gray-900 border-gray-200 hover:border-black",
                          )}
                        >
                          {material}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 rounded px-4 py-3 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4 font-bold min-w-5 text-center">
                  {quantity}
                </span>
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
                <span className="text-gray-400 text-xs uppercase tracking-wider">
                  Total Price
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-12 p-8 bg-gray-50 rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Product Description
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
