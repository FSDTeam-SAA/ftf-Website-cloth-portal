// src/features/addtocart/api/addtocart.ts

import { api } from "@/lib/api";

import { AddToCartRequest, CartResponse } from "../types";

export const addToCartApi = async (accessToken: string, cartData: AddToCartRequest): Promise<void> => {
    try {
        // Correct order: URL, Data, then Config (Headers)
        const response = await api.post('/cart', cartData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Product added to cart:', response.data);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};

export const getCartApi = async (accessToken: string, userId: string): Promise<CartResponse> => {
    try {
        const response = await api.get(`/cart/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Cart retrieved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error retrieving cart:', error);
        throw error;
    }
};