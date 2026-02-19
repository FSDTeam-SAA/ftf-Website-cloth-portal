"use client";
import React, { useEffect, useMemo, useState } from "react";
import { orderCart } from "../../order/api/order.api";
import { useGetCart } from "../hooks/useGetCart";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetMyProfile } from "@/features/account/hooks/useGetMyProfile";

const Addtocart = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: cartResponse, isLoading: isCartLoading } = useGetCart();
  const { data: userProfile } = useGetMyProfile();

  const cartData = cartResponse?.data;
  const cartItems = useMemo(() => cartData?.products || [], [cartData]);

  // useEffect(() => {
  //   if (cartResponse) {
  //     console.log("Full Cart API Response:", cartResponse);
  //     console.log("Cart Data extracted:", cartData);
  //     console.log("Cart Items extracted:", cartItems);
  //   }
  // }, [cartResponse, cartData, cartItems]);

  const [selectedRegion, setSelectedRegion] = useState("Dhaka Division");

  const handleCheckout = async () => {
    const accessToken = session?.accessToken as string;
    const userId = session?.user?.id as string;

    if (!accessToken || !userId) {
      toast.error("Please login to place an order.");
      return;
    }

    const payload = {
      user: userId,
      region: selectedRegion, // using state for region
      totalAmount: cartData?.totalPrice || 0,
      products: cartItems.map((item) => ({
        productId: item?.productId?._id,
        quantity: item?.quantity,
        size: item?.size,
      })),
    };

    const balance = userProfile?.data?.balance || 0;
    const totalPrice = cartData?.totalPrice || 0;

    if (totalPrice > balance) {
      toast.error("Insufficient balance. Please top up your account.");
      return;
    }

    try {
      const response = await orderCart(accessToken, payload);

      if (response?.success) {
        toast.success("Payment successful!");
        // Verify if we need to clear cart manually or if backend handles it
        router.push("/payment-success");
      } else {
        toast.error(response?.message || "Order placement failed!");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to process checkout.");
    }
  };

  if (status === "loading" || (status === "authenticated" && isCartLoading)) {
    return (
      <div className="p-12 text-center text-lg text-gray-600">
        Loading your cart and session...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Please log in to view your cart
        </h2>
        <p className="text-gray-600">
          You need to be authenticated to access your shopping cart and complete
          checkout.
        </p>
      </div>
    );
  }

  const balance = userProfile?.data?.balance || 0;
  const totalPrice = cartData?.totalPrice || 0;
  const isInsufficientBalance = totalPrice > balance;

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-10 text-gray-900 text-center md:text-left">
        Checkout
      </h1>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Left Column: Delivery & User Info */}
        <div className="md:col-span-12 lg:col-span-7 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">
                1
              </span>
              Delivery Information
            </h2>
            <div className="grid gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-1 block">
                  Country / Region
                </span>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                >
                  <option value="21 Industrial Blvd. New Castle, DE 19720">
                    21 Industrial Blvd. New Castle, DE 19720
                  </option>
                  <option value="6380 Flank Dr. #600 Harrisburg, PA 17112">
                    6380 Flank Dr. #600 Harrisburg, PA 17112
                  </option>
                  <option value="141 Delta Dr. Suite D Pittsburgh, PA 15238">
                    141 Delta Dr. Suite D Pittsburgh, PA 15238
                  </option>
                  <option value="1000 Prime Place. Hauppauge, NY 11788">
                    1000 Prime Place. Hauppauge, NY 11788
                  </option>
                  <option value="2 Cranberry Rd. #A5 Parsippany, NJ 07054">
                    2 Cranberry Rd. #A5 Parsippany, NJ 07054
                  </option>
                  <option value="5061 Howerton Way. Suite L Bowie, MD 20715">
                    5061 Howerton Way. Suite L Bowie, MD 20715
                  </option>
                  <option value="10189 Maple Leaf Ct. Ashland, VA 23005">
                    10189 Maple Leaf Ct. Ashland, VA 23005
                  </option>
                  <option value="2551 Eltham Ave. Suite L Norfolk, VA 23513">
                    2551 Eltham Ave. Suite L Norfolk, VA 23513
                  </option>
                </select>
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">
                2
              </span>
              User Information
            </h2>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Customer Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {session?.user?.name || "User Name"}
              </p>
              <p className="text-sm text-gray-500 mt-4 mb-2">Email Address</p>
              <p className="text-lg font-semibold text-gray-900">
                {session?.user?.email || "user@example.com"}
              </p>
            </div>
          </section>

          <div className="space-y-4">
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isInsufficientBalance}
              className="w-full bg-black cursor-pointer text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all transform active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Pay Now ${(cartData?.totalPrice || 0).toFixed(2)}
            </button>
            {isInsufficientBalance && (
              <p className="text-red-500 text-center font-medium">
                Insufficient balance. Please top up your account to proceed.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="md:col-span-12 lg:col-span-5">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 sticky top-8">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">
              Order Summary
            </h3>

            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.length > 0 ? (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center group">
                    <div className="relative w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 p-2 flex-shrink-0 group-hover:border-black transition-colors">
                      <Image
                        src={
                          (item?.productId?.images &&
                          item.productId.images.length > 0
                            ? item.productId.images[0].url
                            : typeof item?.productId?.image === "string"
                              ? item?.productId?.image
                              : item?.productId?.image?.url) ||
                          "/images/placeholder.png"
                        }
                        alt={item?.productId?.title || "Product Image"}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 leading-tight mb-1">
                        {item?.productId?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size:{" "}
                        <span className="font-medium text-gray-700">
                          {item?.size}
                        </span>{" "}
                        | Qty:{" "}
                        <span className="font-medium text-gray-700">
                          {item?.quantity}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        $
                        {(
                          (item?.productId?.price || 0) * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400 mb-2">
                    Your cart is currently empty.
                  </p>
                  <p className="text-sm text-gray-500">
                    Add some uniforms to get started!
                  </p>
                </div>
              )}
            </div>

            <hr className="my-8 border-gray-100" />

            <div className="space-y-4">
              <div className="flex justify-between text-gray">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${(cartData?.totalPrice || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#00A950]">
                <span>Current Balance</span>
                <span className="font-medium text-[#00A950]">
                  ${(userProfile?.data?.balance || 0).toFixed(2)}
                </span>
              </div>
              {/* <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium whitespace-nowrap">
                  Calculated at checkout
                </span>
              </div> */}
              <div className="flex justify-between text-2xl font-bold text-gray-900 pt-6 border-t border-gray-100">
                <span>Total</span>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-normal mb-1">
                    USD
                  </span>
                  <span>${(cartData?.totalPrice || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addtocart;
