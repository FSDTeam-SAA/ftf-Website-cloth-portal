export interface OrderProduct {
    productId: string;
    quantity: number;
    size: string;
}

export interface OrderPayload {
    user: string;
    region: string;
    totalAmount: number;
    products: OrderProduct[];
}

export interface OrderData {
    user: string;
    totalAmount: number;
    remainingBalance: number;
    region: string;
    products: {
        productId: string;
        quantity: number;
        size: string;
        _id: string;
    }[];
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: OrderData;
}
