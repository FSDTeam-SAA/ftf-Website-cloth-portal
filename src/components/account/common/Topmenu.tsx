"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, LogOut, Package, Key, ShoppingBag, DollarSign } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  { href: "/profile", label: "Account" },
  { href: "/orders", label: "Orders" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === href : pathname.startsWith(href));

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center h-20">

        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo1.png"
            alt="PJF Logo"
            width={80}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* 2. Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-10 font-medium text-gray-700">
          {menuItems.map((item) => {
            const href = item.label === "Catalog" && status !== "authenticated" ? "/login" : item.href;
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  className={cn(
                    "transition-colors hover:text-green-600",
                    isActive(item.href) ? "text-black font-bold" : ""
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 3. Action Area (Logged In vs Logged Out) */}
        <div className="flex items-center space-x-6">
          {status === "authenticated" ? (
            <div className="flex items-center space-x-5">
              {/* Shopping Bag Icon */}
              <Link
                href="/checkout"
                className="text-black hover:text-green-600 transition-colors"
              >
                <ShoppingBag size={24} strokeWidth={2.5} />
              </Link>

              {/* Points/Currency Icon - Matches the green '$' in screenshot */}
              <div className="flex items-center text-green-600 font-bold">
                <Link href="/profile/balance">

                  <DollarSign size={24} strokeWidth={3} />
                </Link>
              </div>

              {/* User Profile Info */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 outline-none group">
                    <span className="hidden lg:block font-bold text-gray-900 group-hover:text-green-600">
                      {session?.user?.name || "Edward Steven"}
                    </span>
                    <Avatar className="h-10 w-10 border-2 border-gray-100">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {session?.user?.name?.charAt(0) || <User size={20} />}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel className="cursor-pointer">
                    <Link href="/profile">My Account</Link>
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Personal Information
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
                      Change Password
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
                <div className="flex flex-col space-y-4 mt-10">
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