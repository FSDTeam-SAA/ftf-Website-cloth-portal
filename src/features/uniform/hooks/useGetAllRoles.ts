// features/uniform/hooks/useGetAllRoles.ts
import { useQuery } from "@tanstack/react-query";
import { uniformApi } from "../api/uniform.api";

export const useGetAllRoles = (accessToken: string) => {
    return useQuery({
        queryKey: ["all-roles", accessToken],
        queryFn: async () => {
            const result = await uniformApi.getAllRoles(accessToken);
            return result;
        },
        enabled: !!accessToken,
    });
};
