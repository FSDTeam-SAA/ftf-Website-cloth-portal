import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { updateProfile } from "../api/user.api";
import { toast } from "sonner";

export const useUpdateProfile = () => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken as string;
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => updateProfile(data, accessToken),
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["myProfile"] });
             toast.success("Profile Updated Successfully");
        },
        onError: (error: AxiosError<{ message: string }>) => {
             toast.error(error?.response?.data?.message || "Failed to update profile");
        }
    });
};
