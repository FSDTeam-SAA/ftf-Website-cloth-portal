"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  User,
  LogOut,
  ShoppingBag,
  DollarSign,
  Search,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useGetMyProfile } from "@/features/account/hooks/useGetMyProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/uniforms", label: "Catalog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const { data: userProfile } = useGetMyProfile();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm font-sans">
      <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center h-40">
        {/* 1. Logo Section */}
        <Link href="/" className="flex flex-col items-center justify-center">
          <Image
            src="/images/logo.jpeg"
            alt="PJF Logo"
            width={150}
            height={80}
            className="object-contain"
            priority
          />
        </Link>

        {/* 2. Desktop Navigation Links (Centered) */}
        {/* <ul className="hidden md:flex items-center space-x-12 font-medium text-gray-600">
          {menuItems.map((item) => {
            const href =
              item.label === "Catalog" && status !== "authenticated"
                ? "/login"
                : item.href;
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  className={cn(
                    "transition-colors hover:text-black text-sm uppercase tracking-wider",
                    isActive(item.href) ? "text-black font-bold" : "",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul> */}

        {/* 3. Action Area */}
        <div className="flex items-center space-x-6">
          {/* Visual Search Icon (New) */}
          <button className="text-gray-600 hover:text-black transition-colors">
            <Search size={22} strokeWidth={1.5} />
          </button>

          {status === "authenticated" ? (
            <div className="flex items-center space-x-5">
              {/* User Profile Info */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center outline-none group text-gray-600 hover:text-black transition-colors font-bold border rounded-full p-2 w-10 h-10 cursor-pointer">
                    {session?.user?.name ? (
                      <span className="text-sm">
                        {getUserInitials(session.user.name)}
                      </span>
                    ) : (
                      <User size={22} strokeWidth={1.5} />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel className="cursor-pointer">
                    <span className="font-bold">{session?.user?.name}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/orders" className="cursor-pointer">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile/change-password"
                      className="cursor-pointer"
                    >
                      Authorize Update
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Shopping Bag Icon */}
              <Link
                href="/checkout"
                className="text-gray-600 hover:text-black transition-colors cursor-pointer"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
              </Link>

              {/* Points/Currency Icon - Kept for logic, visible but matched style */}
              <div
                className="flex items-center text-green-600 font-bold space-x-1"
                title="Balance"
              >
                <Link
                  href="/profile/balance"
                  className="flex items-center cursor-pointer"
                >
                  <DollarSign size={22} strokeWidth={2} />
                  <span>{userProfile?.data?.balance ?? 0}</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Logged Out View */
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" className="font-semibold">
                  Log In
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col px-4 space-y-4 mt-10">
                  {menuItems.map((item) => {
                    const href =
                      item.label === "Catalog" && status !== "authenticated"
                        ? "/login"
                        : item.href;
                    return (
                      <Link
                        key={item.href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className="text-lg font-semibold"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  {status === "unauthenticated" && (
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-green-600">Log In</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
