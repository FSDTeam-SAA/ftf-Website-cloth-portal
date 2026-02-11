import { api } from "@/lib/api";
import { OrderPayload, OrderResponse } from "../types";

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


export const orderCart = async (accessToken: string, orderData: OrderPayload): Promise<OrderResponse> => {
    const response = await api.post(`/order/`, orderData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
}