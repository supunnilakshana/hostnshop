/* eslint-disable @typescript-eslint/no-unused-vars */
// src/presentation/components/header/NavBar.tsx
"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {Bell, ShoppingCart, Menu, X, User, LogOut, Search} from "lucide-react";
import {Button} from "@/presentation/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import {useAuthStore} from "@/lib/store/authStore";
import {useCartStore} from "@/lib/store/cartStore";
import {useNotificationStore} from "@/lib/store/notificationStore";
import {UserRole} from "@/shared/enums/auth.enum";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const {isAuthenticated, user, logout} = useAuthStore();
  const {totalItems} = useCartStore();
  const {unreadCount, fetchNotifications} = useNotificationStore();

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated, fetchNotifications]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    {name: "Home", href: "/"},
    {name: "Shop", href: "/products"},

    {name: "About", href: "/about-us"},
    {name: "Contact", href: "/contact-us"},
  ];

  const isAdmin = user?.role === UserRole.ADMIN;

  if (isAdmin) {
    return <></>;
  } else {
    return (
      // check if the user is authenticated and show the admin link

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/assets/images/HostNShop.png"
                alt="HostNShop"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-bg_primary ${
                    pathname === link.href
                      ? "text-bg_primary"
                      : "text-textSecondary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              {/* Search
              <Link
                href="/search"
                className="p-2 rounded-full hover:bg-grayLight"
              >
                <Search className="h-5 w-5 text-textSecondary" />
              </Link> */}
              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-grayLight relative"
              >
                <ShoppingCart className="h-5 w-5 text-textSecondary" />
                {isMounted && totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bg_primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </Link>
              {/* Notifications */}
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5 text-textSecondary" />
                      {isMounted && unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuLabel className="flex justify-between items-center">
                      <span>Notifications</span>
                      <Link
                        href="/notifications"
                        className="text-xs text-bg_primary hover:underline"
                      >
                        View All
                      </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-64 overflow-y-auto">
                      {/* Notification items would go here */}
                      <div className="py-2 px-4 text-sm text-center text-gray-500">
                        No new notifications
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 bg-bg_primary text-white text-sm"
                    >
                      {user?.name?.substring(0, 1) || "U"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile & Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex space-x-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/auth/register">Register</Link>
                  </Button>
                </div>
              )}
              {/* Mobile Menu Button */}
              <div className="flex md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.href
                      ? "bg-bg_primary text-white"
                      : "text-textSecondary hover:bg-grayLight"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-textSecondary hover:bg-grayLight"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-textSecondary hover:bg-grayLight"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }
}
