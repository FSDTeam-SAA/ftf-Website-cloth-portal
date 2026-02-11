"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  /* Logic removed as requested */

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[32px] shadow-[0px_20px_50px_rgba(0,0,0,0.05)] p-10 text-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-linear-to-r from-green-400 to-emerald-500" />

          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
              <div className="relative bg-green-500 rounded-full p-4">
                <CheckCircle2 className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-[32px] font-bold text-gray-900 mb-3 font-inter tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-gray-500 text-lg mb-8 font-inter">
            Your payment has been processed successfully.
          </p>

          <button
            onClick={() => router.push("/")}
            className="group w-full bg-[#00A950] hover:bg-[#00A950]/80 text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
          >
            <span>Continue Now</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
