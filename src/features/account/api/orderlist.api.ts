// features/account/api/orderlist.api.ts
import { api } from "@/lib/api";

export const getOrderList = async (userId: string, data: { pageCount?: number; deliveryType?: string }) => {
    try {
        const response = await api.get(`order/${userId}/my-history`, {
            params: {
                pageCount: data.pageCount,
                deliveryType: data.deliveryType
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
