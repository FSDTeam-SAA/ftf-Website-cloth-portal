// features/auth/api/verifycode.api.ts
import { api } from "@/lib/api";
import { VerifyCodeFormData } from "../types";

export const verifyCode = async (formData: VerifyCodeFormData, accessToken: string) => {
    try {
        const response = await api.post("/auth/verify-otp", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}