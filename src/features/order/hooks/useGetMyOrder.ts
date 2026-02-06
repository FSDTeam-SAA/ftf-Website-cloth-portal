import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../api/order.api";
import { useSession } from "next-auth/react";

export const useGetMyOrder = () => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken as string;
    const userId = session?.user?.id as string;

    return useQuery({
        queryKey: ["my-orders", userId],
        queryFn: () => orderApi.getOrderList(accessToken, userId),
        enabled: !!(accessToken && userId),
    });
};