// src/features/addtocart/hooks/useAddtoCart.ts

// src/features/addtocart/hooks/useAddtoCart.ts

import { addToCartApi } from "../api/addtocart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AddToCartRequest } from "../types";

export const useAddToCart = () => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken as string;
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartData: AddToCartRequest) => addToCartApi(accessToken, cartData),
        mutationKey: ["addToCart"],
        onSuccess: () => {
            console.log("Product added to cart successfully");
            // Invalidate the cart query so it refetches on the checkout page
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            console.error("Error adding product to cart:", error);
        },
    });
};
