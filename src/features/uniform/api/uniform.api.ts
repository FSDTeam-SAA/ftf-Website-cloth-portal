import { api } from "@/lib/api";
import { ApiResponse, Product, ProductCreateInput, Role } from "../types/uniform.types";

/**
 * API service for Uniform/Product related operations
 */
export const uniformApi = {
    /**
     * Fetch all products
     * @returns Promise with list of all products
     */
    getAllProducts: async (): Promise<ApiResponse<Product[]>> => {
        try {
            const res = await api.get("/product/all");
            return res.data;
        } catch (err) {
            console.error("Error fetching all products:", err);
            throw new Error("Failed to fetch all products");
        }
    },

    /**
     * Fetch a specific product by its ID
     * @param productId - The unique identifier of the product
     * @returns Promise with the single product data
     */
    getProductById: async (productId: string): Promise<ApiResponse<Product>> => {
        try {
            const res = await api.get(`/product/${productId}`);
            return res.data;
        } catch (err) {
            console.error(`Error fetching product with ID ${productId}:`, err);
            throw new Error(`Failed to fetch product with ID ${productId}`);
        }
    },

    /**
     * Fetch products by a specific category/type
     * @param type - The category or type of products to fetch
     * @returns Promise with list of products of that type
     */
    getProductsByType: async (type: string): Promise<ApiResponse<Product[]>> => {
        try {
            const res = await api.get(`/product/type/${type}`);
            return res.data;
        } catch (err) {
            console.error(`Error fetching products by type ${type}:`, err);
            throw new Error(`Failed to fetch products by type ${type}`);
        }
    },

    /**
     * Create a product linked to a specific user role/ID
     * @param userId - The ID of the user creating the product
     * @param data - The product information to create
     * @returns Promise with the created product data
     */
    createProductByRole: async (
        userId: string,
        data: ProductCreateInput
    ): Promise<ApiResponse<Product>> => {
        try {
            const res = await api.post(`/product/user/${userId}`, data);
            return res.data;
        } catch (err) {
            console.error(`Error creating product for user ${userId}:`, err);
            throw new Error("Failed to create product");
        }
    },


    // get product by role 
    getProductByRole: async (accessToken: string, roleId: string): Promise<ApiResponse<Product[]>> => {
        try {
            const res = await api.get(`/product/user/${roleId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (err) {
            console.error(`Error fetching products by role ID ${roleId}:`, err);
            throw new Error(`Failed to fetch products by role`);
        }
    },

    /**
     * Fetch all roles
     * @param accessToken - The authentication token
     * @returns Promise with list of all roles
     */
    getAllRoles: async (accessToken: string): Promise<ApiResponse<Role[]>> => {
        try {
            const res = await api.get("/role", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (err) {
            console.error("Error fetching all roles:", err);
            throw new Error("Failed to fetch all roles");
        }
    },
};