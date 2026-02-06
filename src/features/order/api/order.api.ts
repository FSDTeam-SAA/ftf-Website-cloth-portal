//  src/features/order/api/order.api.ts

import { api } from "@/lib/api";

export const orderApi = {
    getOrderList: async (accessToken: string, userId: string) => {
        const response = await api.get(`/order/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    },
};
