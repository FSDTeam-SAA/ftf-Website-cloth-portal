//  features/account/hooks/useGetMyProfile.ts
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getMyProfile } from "../api/user.api";

export const useGetMyProfile = () => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken as string;

    return useQuery({
        queryKey: ["myProfile", accessToken],
        queryFn: () => getMyProfile(accessToken),
        enabled: !!accessToken,
    });
};
