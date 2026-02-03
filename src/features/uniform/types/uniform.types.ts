export interface Product {
    _id: string;
    image: string;
    title: string;
    type: string;
    description: string;
    size: string;
    availableQuantity: number;
    price: number;
    role: string | null;
    status: "active" | "inactive";
    createdAt: string;
    updatedAt: string;
}

export interface ProductCreateInput {
    image: string;
    title: string;
    type: string;
    description: string;
    size: string;
    availableQuantity: number;
    price: number;
    role?: string | null;
    status?: "active" | "inactive";
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
}
