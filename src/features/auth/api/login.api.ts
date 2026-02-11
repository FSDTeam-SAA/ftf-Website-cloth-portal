import { api } from "@/lib/api";
import { LoginResponse } from "../types";

export const loginApi = async (data: Record<string, string>): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", data);
    console.log(response.data);
    return response.data;
};

export const refreshTokenApi = async (refreshToken: string): Promise<LoginResponse> => {
    const response = await api.post("/auth/refresh-token", { refreshToken });
    return response.data;
};
