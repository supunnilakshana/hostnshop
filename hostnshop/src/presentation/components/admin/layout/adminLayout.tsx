/* eslint-disable @typescript-eslint/no-unused-vars */
// src/presentation/components/admin/layout/AdminLayout.tsx
"use client";

import React, {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tags,
  Users,
  Settings,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import {useAuthStore} from "@/lib/store/authStore";
import {Button} from "@/presentation/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({children}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const {isAuthenticated, user, logout} = useAuthStore();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/home",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: "Categories",
      href: "/admin/category",
      icon: <Tags className="w-5 h-5" />,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    logout();
    // Redirect to login page
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/admin/home" className="flex items-center">
              <Image
                src="/assets/images/HostNShop.png"
                alt="HostNShop Logo"
                width={150}
                height={40}
              />
            </Link>
            <button
              className="p-1 rounded-md lg:hidden hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md group ${
                    isActive
                      ? "bg-bg_primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="flex items-center w-full bg-bg_primary hover:bg-btn_hover text-accent hover:text-accent"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="p-1 rounded-md lg:hidden hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-bg_primary flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <span className="text-sm font-medium">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className=" overflow-y-auto p-4 md:p-6 bg-gray-50 hide-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
