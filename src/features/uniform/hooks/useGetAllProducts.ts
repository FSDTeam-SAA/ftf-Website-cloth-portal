// features/uniform/hooks/useGetAllProducts.ts
import { useQuery } from "@tanstack/react-query";
import { uniformApi } from "../api/uniform.api";

export const useGetAllProducts = () => {
    console.log("🔵 useGetAllProducts hook called");

    return useQuery({
        queryKey: ["all-products"],
        queryFn: async () => {
            console.log("🔵 Fetching all products...");
            const result = await uniformApi.getAllProducts();
            console.log("🔵 All products fetched:", result);
            return result;
        },
    });
};
