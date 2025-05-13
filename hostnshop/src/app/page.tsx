/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {useAuthStore} from "@/lib/store/authStore";
import AdminDashBoardPage from "@/presentation/pages/admin/adminDashboardPage";
import ClientHomePage from "@/presentation/pages/client/clientHomePage";
import {UserRole} from "@/shared/enums";

export default function page() {
  const {isAuthenticated, user, logout} = useAuthStore();
  const isAdmin = user?.role === UserRole.ADMIN;

  if (isAuthenticated && isAdmin) {
    return (
      <>
        <AdminDashBoardPage />
      </>
    );
  } else {
    return (
      <>
        <ClientHomePage />
      </>
    );
  }
}
