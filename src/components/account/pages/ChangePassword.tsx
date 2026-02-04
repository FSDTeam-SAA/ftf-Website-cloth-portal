// components/account/pages/ChangePassword.tsx
"use client";

import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePassword } from "@/features/account/hooks/useChangepasswordUser";
import { useSession } from "next-auth/react";
import { Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const { data: session } = useSession();
  const { loading, error, handleChangePassword } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error("User session not found. Please log in again.");
      return;
    }

    const res = await handleChangePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });

    if (res) {
      toast.success("Security Credentials Updated", {
        description: "Your password protocol has been synchronized.",
        icon: <ShieldCheck className="text-green-500" />,
      });
      setFormData({ oldPassword: "", newPassword: "" });
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-10 animate-in fade-in duration-700">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Sidebar - Profile Card */}
        <div className="w-full lg:w-auto shrink-0 flex justify-center">
          <ProfileCard />
        </div>

        {/* Right Content - Password Form */}
        <div className="flex-1 w-full bg-white rounded-[2rem] p-10 lg:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                Change Password
              </h1>
              <p className="text-gray-500">Update your security credentials.</p>
            </div>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-xl">
            <div className="space-y-6">
              {/* Current Password */}
              <div className="space-y-3">
                <Label className="font-bold text-gray-700">
                  Current Password
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.oldPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPassword: e.target.value })
                  }
                  required
                  className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-0 focus:border-[#ff7a00]"
                />
              </div>

              {/* New Password */}
              <div className="space-y-3">
                <Label className="font-bold text-gray-700">New Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create strong password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    required
                    className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-0 focus:border-[#ff7a00] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-8 rounded-xl font-bold bg-black text-white hover:bg-[#ff7a00] transition-colors"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                Authorize Update
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-12 px-8 rounded-xl font-bold border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
