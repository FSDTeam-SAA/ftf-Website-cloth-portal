"use client";

import React from "react";
import ProfileCard from "./ProfileCard";
import { useGetMyProfile } from "@/features/account/hooks/useGetMyProfile";
import { ProfileForm } from "./ProfileForm";
import { Loader2 } from "lucide-react";

const PersonalInformation = () => {
  const { data: profile, isLoading } = useGetMyProfile();

  return (
    <div className="min-h-screen bg-transparent py-10 animate-in fade-in duration-700">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Sidebar - Profile Card */}
        <div className="w-full lg:w-auto shrink-0 flex justify-center">
          <ProfileCard />
        </div>

        {/* Right Content - Profile Form */}
        {profile ? (
          <ProfileForm
            initialData={profile}
            key={profile.id || "profile-form"}
          />
        ) : (
          <div className="flex-1 w-full flex justify-center items-center h-96 bg-white rounded-[2rem] shadow-sm border border-gray-100">
            {isLoading ? (
              <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
            ) : (
              <div className="text-gray-500">Failed to load profile.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;
