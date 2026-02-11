// feateure/account/api/user.api.ts
import { api } from "@/lib/api";

// GET method {{base_url}}/user/my-profile
export const getMyProfile = async (accessToken: string) => {
    try {
        const response = await api.get("/user/my-profile", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// PUT Mehtod /user/update-profile
export const updateProfile = async (data: FormData, accessToken: string) => {
    try {
        const response = await api.put("/user/update-profile", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// POST /user/verify-email
export const verifyEmail = async (data: { otp: string }, accessToken: string) => {
    try {
        const response = await api.post("/user/verify-email", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// POST /user/resend-otp
export const resendOtp = async (accessToken: string) => {
    try {
        const response = await api.post("/user/resend-otp", {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

