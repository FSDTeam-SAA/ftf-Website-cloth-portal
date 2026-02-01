"use client";

import { Button } from "@/components/ui/button";
import { Users, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function Hero({ type }: { type?: string }) {
  const { status } = useSession();
  return (
    <section className="bg-white py-16 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome PJ Team Members
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            What do you want to do today?
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Uniform Portal Card */}
          <div className="bg-white border-2 border-gray-100 rounded-[32px] p-12 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-white p-4 rounded-full mb-6">
              <Users size={80} className="text-[#00B050]" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Uniform Portal
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs leading-relaxed">
              Access your uniform ordering system and manage your work attire.
            </p>
            <Link href={status === "authenticated" ? "/uniforms" : "/login"}>
              <Button className="bg-black hover:bg-black/90 text-white font-bold py-6 px-10 rounded-xl text-lg h-auto">
                Go to Uniforms
              </Button>
            </Link>
          </div>

          {/* Swag Store Card */}
          <div className="bg-white border-2 border-gray-100 rounded-[32px] p-12 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-white p-4 rounded-full mb-6">
              <ShoppingCart size={80} className="text-[#00B050]" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Swag Store
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs leading-relaxed">
              Browse and order company swag, merchandise, and branded items.
            </p>
            <Link href="https://3y1stc-jq.myshopify.com/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-black hover:bg-black/90 text-white font-bold py-6 px-10 rounded-xl text-lg h-auto">
                Buy Swag
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
