"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import React, { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyProfile } from "@/features/account/hooks/useGetMyProfile";
import { useUpdateProfile } from "@/features/account/hooks/useUpdateProfile";

function ProfileCardSkeleton() {
    return (
        <Card className="overflow-hidden rounded-2xl border-none shadow-lg animate-pulse">
            <div className="h-40 w-full bg-gray-200" />
            <div className="relative px-8 pb-12 -mt-20">
                <div className="relative mx-auto w-max">
                    <Skeleton className="h-40 w-40 rounded-full ring-4 ring-white" />
                </div>
                <div className="text-center mt-6 space-y-2">
                    <Skeleton className="h-8 w-48 mx-auto" />
                </div>
                <div className="mt-10 space-y-6">
                    {[...Array(5)].map((_, i) => (
                        <div className="flex gap-4 px-4" key={i}>
                            <Skeleton className="w-24 h-5" />
                            <Skeleton className="flex-1 h-5" />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export function ProfileCard() {
    const { data: profileResponse, isLoading } = useGetMyProfile();
    const updateImageMutation = useUpdateProfile();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleEditAvatar = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append("image", file);
            updateImageMutation.mutate(formData, {
                onSuccess: () => setPreviewImage(null),
            });
        }
    };

    if (isLoading || !profileResponse?.data) return <ProfileCardSkeleton />;

    const profile = profileResponse.data;

    // Mapping profile data for the list
    const infoItems = [
        { label: "Name:", value: `${profile.firstName} ${profile.lastName}` },
        { label: "Email:", value: profile.email },
        { label: "Phone:", value: profile.phoneNumber || "+1 (555) 123-4567" }, // Fallback for UI matching
        { label: "Region:", value: profile.region || "Kentucky 39495" },
        { label: "Home Address:", value: profile.homeAddress || "4517 Washington Ave. Manchester" },
    ];

    return (
        <Card className="overflow-hidden border-none py-0! rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white min-h-screen">
            {/* Top Banner - Dark Gray */}
            <div className="h-40 bg-[#333333]" />

            <div className="relative px-8 pb-12 -mt-20">
                {/* Avatar Section */}
                <div className="relative mx-auto w-max">
                    <Avatar className="h-40 w-40 ring-4 ring-white shadow-sm border-none">
                        <AvatarImage
                            src={previewImage || profile.avatar || ""}
                            alt="Profile"
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-gray-100 text-2xl font-bold">
                            {profile.firstName?.[0]}{profile.lastName?.[0]}
                        </AvatarFallback>
                    </Avatar>

                    {/* Edit Button - Black background */}
                    <button
                        onClick={handleEditAvatar}
                        className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-black flex items-center justify-center text-white shadow-md ring-4 ring-white transition-transform active:scale-90"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>

                {/* User Name */}
                <div className="text-center mt-6">
                    <h2 className="text-3xl font-bold text-black tracking-tight">
                        {profile.firstName} {profile.lastName}
                    </h2>
                </div>

                {/* Info Rows */}
                <div className="mt-12 space-y-7 px-4">
                    {infoItems.map((item, idx) => (
                        <div key={idx} className="flex items-start text-[15px]">
                            <span className="w-32 font-semibold text-gray-700 shrink-0">
                                {item.label}
                            </span>
                            <span className="text-slate-400 font-medium">
                                {item.value || "-"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default ProfileCard;