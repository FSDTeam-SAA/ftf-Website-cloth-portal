"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string, rememberMe: boolean = false) => {
        setLoading(true);
        setError(null);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
                rememberMe,
            });

            if (result?.error) {
                setError(result.error);
                return result;
            }

            console.log(result);

            return result;
        } catch (err: unknown) {
            setError((err as Error)?.message || "Something went wrong");
            return undefined;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleLogin };
}