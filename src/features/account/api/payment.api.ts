// featuers/account/api/payment.api.ts
import { api } from "@/lib/api";


export const getPaymentHistory = async (accessToken: string, userId: string) => {
    try {
        const response = await api.get(`/order/${userId}/my-history`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};