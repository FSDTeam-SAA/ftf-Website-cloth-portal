// features/auth/component/login.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useLogin } from "../hooks/uselogin";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { loading, error, handleLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get callback URL from search params (for redirecting after login)
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleLogin(email, password, rememberMe);
    if (res && !res.error) {
      // Redirect to callback URL (e.g., /create-book) or home
      router.push(callbackUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg p-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <Link href="/">
            <Image
              src="/images/logo1.png"
              alt="Company Logo"
              width={120}
              height={120}
          />
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-center text-gray-800 text-2xl font-semibold mb-2">
          Welcome
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Manage your orders, track shipments, and configure products easily.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:bg-primary/5 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-base mt-2 px-1">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary transition-all cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <Link
              href="/reset-password"
              title="reset password"
              className="text-gray-500 font-medium hover:text-gray-500/80 transition-all hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* <div className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:text-primary/80 transition-all hover:underline"
            >
              Create an account
            </Link>
          </div> */}

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-gray-800 cursor-pointer hover:bg-gray-500 text-white font-semibold py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
