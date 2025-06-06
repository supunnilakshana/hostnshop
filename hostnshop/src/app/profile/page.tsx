// src/app/profile/page.tsx
"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import {useAuthStore} from "@/lib/store/authStore";
import ProfileForm from "@/presentation/components/account/ProfileForm";
import OrderHistory from "@/presentation/components/account/OrderHistory";
import AddressBook from "@/presentation/components/account/AddressBook";
import UserReviews from "@/presentation/components/client/product/UserReviews";
import NotificationsSettings from "@/presentation/components/account/NotificationsSettings";
import PasswordChangeForm from "@/presentation/components/account/PasswordChangeForm";
import {UserRole} from "@/shared/enums/auth.enum";

export default function ProfilePage() {
  const router = useRouter();
  const {isAuthenticated, user} = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/profile");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">My Account</h1>

      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {/* show orders only for user */}
          {!isAdmin && <TabsTrigger value="orders">Orders</TabsTrigger>}
          {/* show addresses only for user */}
          {!isAdmin && <TabsTrigger value="addresses">Addresses</TabsTrigger>}
          {/* show reviews only for user */}
          {!isAdmin && <TabsTrigger value="reviews">Reviews</TabsTrigger>}
          {/* show notifications only for user */}

          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>

        {/* show orders only for user */}
        {!isAdmin && (
          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>
        )}

        {/* show addresses only for user */}
        {!isAdmin && (
          <TabsContent value="addresses">
            <AddressBook />
          </TabsContent>
        )}

        {/* show reviews only for user */}
        {!isAdmin && (
          <TabsContent value="reviews">
            <UserReviews />
          </TabsContent>
        )}

        {/* show notifications only for user */}

        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>

        <TabsContent value="password">
          <PasswordChangeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
