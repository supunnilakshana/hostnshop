/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, {useState, useEffect} from "react";

import AdminLayout from "@/presentation/components/admin/layout/adminLayout";
import ProfilePage from "@/app/profile/page";

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <ProfilePage />
    </AdminLayout>
  );
}
