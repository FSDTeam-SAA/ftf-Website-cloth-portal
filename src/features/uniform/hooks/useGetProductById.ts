// features/uniform/hooks/useGetProductById.ts
import { useQuery } from "@tanstack/react-query";
import { uniformApi } from "../api/uniform.api";

export const useGetProductById = (productId: string | null) => {
    console.log("🟡 useGetProductById hook called with ID:", productId);

    return useQuery({
        queryKey: ["product-by-id", productId],
        queryFn: async () => {
            console.log("🟡 Fetching product by ID:", productId);
            const result = await uniformApi.getProductById(productId!);
            console.log("🟡 Product by ID fetched:", result);
            return result;
        },
        enabled: !!productId, // Only run query if productId exists
    });
};
