"use client";

import React from "react";
import { Users, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-transparent py-20 px-4 min-h-[600px] flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full">
        <h2 className="text-gray-800 text-center text-4xl mb-4 font-medium">
          UNIFORM PORTAL
        </h2>
        <p className="text-gray-600 text-center text-lg mb-20 font-medium">
          What do you want to do today?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Uniform Portal Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-100 rounded-[2rem] p-10 flex flex-col items-center text-center shadow-xl"
          >
            <div className="bg-green-50 p-6  rounded-full mb-6">
              <Users className="w-16 h-16 text-green-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold text-black mb-4 font-sans">
              Welcome PJ Team Members{" "}
            </h3>
            <p className="text-gray-600 mb-8 max-w-[300px] leading-relaxed">
              Access your uniform ordering system and manage your work attire.
            </p>
            <Link
              href="/uniforms"
              className="bg-[#00A950] text-white px-10 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Go to Uniforms
            </Link>
          </motion.div>

          {/* Swag Store Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-100 rounded-[2rem] p-10 flex flex-col items-center text-center shadow-xl"
          >
            <div className="bg-green-50 p-6 rounded-full mb-6">
              <ShoppingCart
                className="w-16 h-16 text-green-600"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-3xl font-bold text-black mb-4 font-sans">
              Swag Store
            </h3>
            <p className="text-gray-600 mb-8 max-w-[300px] leading-relaxed">
              Browse and order company swag, merchandise, and branded items.
            </p>
            <a
              href="https://pjswag.com/pages/swag-store"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00A950] text-white px-10 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Buy Swag
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
