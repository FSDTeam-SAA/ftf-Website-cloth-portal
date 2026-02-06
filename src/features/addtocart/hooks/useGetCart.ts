// src/features/addtocart/hooks/useGetCart.ts

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCartApi } from "../api/addtocart";

export const useGetCart = () => {
    const { data: session, status } = useSession();
    const accessToken = session?.accessToken as string;
    const userId = session?.user?.id as string;

    // Debugging logs
    console.log("useGetCart hook status:", status);
    console.log("useGetCart token available:", !!accessToken);
    console.log("useGetCart userId available:", !!userId);
    console.log("useGetCart session user object:", session?.user);

    return useQuery({
        queryKey: ["cart", userId],
        queryFn: () => getCartApi(accessToken, userId),
        enabled: !!(accessToken && userId),
    });
};