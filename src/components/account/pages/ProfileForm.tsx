"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProfile } from "@/features/account/hooks/useUpdateProfile";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";



interface ProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  homeAddress?: string;
  city?: string;
  region?: string;
}

interface ProfileFormProps {
  initialData: ProfileData;
}

// Addresses extracted from Frame 2147230433.png
const ADDRESS_OPTIONS = [
  "21 Industrial Blvd. New Castle, DE 19720",
  "6380 Flank Dr. #600 Harrisburg, PA 17112",
  "141 Delta Dr. Suite D Pittsburgh, PA 15238",
  "1000 Prime Place. Hauppauge, NY 11788",
  "2 Cranberry Rd. #A5 Parsippany, NJ 07054",
  "5061 Howerton Way. Suite L Bowie, MD 20715",
  "10189 Maple Leaf Ct. Ashland, VA 23005",
  "2551 Eltham Ave. Suite L Norfolk, VA 23513",
];

export const ProfileForm = ({ initialData }: ProfileFormProps) => {
  const updateProfileMutation = useUpdateProfile();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    phoneNumber: initialData.phoneNumber || "",
    email: initialData.email || "",
    homeAddress: initialData.homeAddress || "",
    city: initialData.city || "",
    region: initialData.region || "Kentucky 39495",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const payload = new FormData();
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("city", formData.city);
    payload.append("homeAddress", formData.homeAddress);
    payload.append("region", formData.region);

    updateProfileMutation.mutate(payload);
  };

  const handleDiscard = () => {
    setFormData({
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      phoneNumber: initialData.phoneNumber || "",
      email: initialData.email || "",
      homeAddress: initialData.homeAddress || "",
      city: initialData.city || "",
      region: initialData.region || "Kentucky 39495",
    });
  };

  return (
    <div className="flex-1 w-full bg-white rounded-4xl p-10 lg:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
            Personal Information
          </h1>
          <p className="text-gray-500">
            Manage your personal information and profile details.
          </p>
        </div>
        {/* Optional Edit Profile Button (Header Action) */}

        <div className=" flex gap-2 justify-between items-center ">


          <Button
            variant="outline"
            className="h-12 px-8 rounded-xl font-bold border-gray-300 text-gray-600 hover:bg-gray-50"
            onClick={() => router.push("/profile/payment-history")}
          >
            Payment History
          </Button>

          <Button
            className="bg-black text-white hover:bg-gray-800 rounded-lg px-6 font-bold"
            onClick={() => {
              const input = document.getElementById("firstNameInput");
              input?.focus();
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* First Name */}
        <div className="space-y-3">
          <Label className="font-bold text-gray-700">First Name</Label>
          <Input
            id="firstNameInput"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-0 focus:border-[#ff7a00]"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-3">
          <Label className="font-bold text-gray-700">Last Name</Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-0 focus:border-[#ff7a00]"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-3 md:col-span-2">
          <Label className="font-bold text-gray-700">Email Address</Label>
          <Input
            name="email"
            value={formData.email}
            disabled
            className="h-14 bg-gray-50 border-gray-200 rounded-xl text-gray-500"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-3 md:col-span-2">
          <Label className="font-bold text-gray-700">Phone Number</Label>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-0 focus:border-[#ff7a00]"
          />
        </div>

        {/* Home Address */}
        <div className="space-y-3 md:col-span-2">
          <Label className="font-bold text-gray-700">Home Address</Label>
          <Input
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-0 focus:border-[#ff7a00]"
          />
        </div>

        {/* City */}
        <div className="space-y-3 md:col-span-2">
          <Label className="font-bold text-gray-700">City</Label>
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-0 focus:border-[#ff7a00]"
          />
        </div>

        {/* Region - Dropdown Example as per screenshot */}
        <div className="space-y-3 md:col-span-2">
          <Label className="font-bold text-gray-700">Region</Label>
          <Select
            value={formData.region}
            onValueChange={(val) => setFormData({ ...formData, region: val })}
          >
            <SelectTrigger className="h-14 bg-white border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black transition-all">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>

            <SelectContent className="max-h-[300px]">
              {ADDRESS_OPTIONS.map((address) => (
                <SelectItem
                  key={address}
                  value={address}
                  className="py-3 cursor-pointer focus:bg-slate-50"
                >
                  {address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-100">


        <div className="flex gap-4">
          <Button
            variant="outline"
            className="h-12 px-8 rounded-xl font-bold border-gray-300 text-gray-600 hover:bg-gray-50"
            onClick={handleDiscard}
          >
            Discard Changes
          </Button>
          <Button
            className="h-12 px-8 rounded-xl font-bold bg-black text-white hover:bg-[#ff7a00] transition-colors"
            onClick={handleSave}
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
