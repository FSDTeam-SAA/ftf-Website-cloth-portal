// Define an interface for the product structure
export interface CartProduct {
    productId: string;
    quantity: number;
    size: string;
}

// Define an interface for the request body
export interface AddToCartRequest {
    userId: string;
    products: CartProduct[];
    totalPrice: number;
}

export interface PopulatedCartProduct {
    productId: {
        image: string | { url: string; publicId: string };
        _id: string;
        title: string;
        type: string;
        description: string;
        size: string;
        availableQuantity: number;
        price: number;
        role: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        targetRoles: string[];
    };
    quantity: number;
    size: string;
    _id: string;
}

export interface CartData {
    _id: string;
    userId: string;
    products: PopulatedCartProduct[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface CartResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: CartData;
}
