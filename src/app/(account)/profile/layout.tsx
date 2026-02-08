// app/profile/layout.tsx

import ProfileSidebar from "@/components/account/common/ProfileSidebar";
import Navbar from "@/components/account/common/Topmenu";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    // Set a light gray background for the entire page to match the screenshot
    <div className="min-h-screen bg-[#F8F9FA]"> 
      <Navbar />
      
      {/* Container to center the content and provide horizontal padding */}
      <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        
        

        {/* Content Area: White card with border and shadow */}
        <section className="flex-1 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          {children}
        </section>

      </main>
    </div>
  );
}