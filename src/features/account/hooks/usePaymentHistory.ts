// features/account/hooks/usePaymentHistory.ts
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getPaymentHistory } from "../api/payment.api";

export const usePaymentHistory = () => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken as string;
    const userId = session?.user?.id as string;

    return useQuery({
        queryKey: ["paymentHistory", accessToken, userId],
        queryFn: () => getPaymentHistory(accessToken, userId),
        enabled: !!accessToken && !!userId,
    });
};