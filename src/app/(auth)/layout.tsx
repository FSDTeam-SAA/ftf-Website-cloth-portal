import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome!",
  description:
    "Manage your orders, track shipments, and configure products easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="h-screen w-screen bg-secondary flex items-center justify-center">
    //   {children}
    // </div>
    <div className="h-screen w-screen bg-white bg-cover bg-center flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
}
