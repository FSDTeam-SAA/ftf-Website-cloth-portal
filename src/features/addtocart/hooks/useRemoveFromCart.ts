import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { deleteCartItemApi } from "../api/addtocart";

export const useRemoveFromCart = () => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken as string;
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItemId: string) => deleteCartItemApi(accessToken, cartItemId),
        mutationKey: ["removeFromCart"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" });
        },
        onError: (error) => {
            console.error("Error removing cart item:", error);
        },
    });
};
