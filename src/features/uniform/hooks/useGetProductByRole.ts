// features/uniform/hooks/useGetProductByRole.ts
import { useQuery } from "@tanstack/react-query";
import { uniformApi } from "../api/uniform.api";

export const useGetProductByRole = (accessToken: string, role: string | null) => {
    console.log("🟢 useGetProductByRole hook called with token:", accessToken, "and role:", role);

    return useQuery({
        queryKey: ["products-by-role", accessToken, role],
        queryFn: async () => {
            console.log("🟢 Fetching products by role:", role);
            const result = await uniformApi.getProductByRole(accessToken, role!);
            console.log("🟢 Products by role fetched:", result);
            return result;
        },
        enabled: !!role && !!accessToken, // Only run query if both role and accessToken exist
    });
};