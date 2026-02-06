export interface User {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber?: string;
    homeAddress?: string;
    city?: string;
    region?: string;
    location?: string;
}

export interface LoginData {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: LoginData;
}

export interface ForgotPasswordFormData {
    email: string;
}

export interface VerifyCodeFormData {
    email: string;
    otp: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}