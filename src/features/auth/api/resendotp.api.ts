import { api } from "@/lib/api";

export const resendOtp = async (accessToken: string) => {
    try {
        const response = await api.post("/auth/resend-forgot-otp", {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        // console.error("Error resending OTP:", error);
        throw error;
    }
};
