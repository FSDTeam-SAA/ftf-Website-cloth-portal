// featuers/account/api/payment.api.ts
import { api } from "@/lib/api";


export const getPaymentHistory = async (accessToken: string) => {
    try {
        const response = await api.get(`/order/user/my-history`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};