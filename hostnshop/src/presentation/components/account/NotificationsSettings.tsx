// src/components/account/NotificationsSettings.tsx
"use client";

import {useState, useEffect} from "react";
import {Switch} from "@/presentation/components/ui/switch";
import {Label} from "@/presentation/components/ui/label";
import {Button} from "@/presentation/components/ui/button";
import {apiClient} from "@/lib/api/client";

interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  order_updates: boolean;
  promotions: boolean;
  new_products: boolean;
  newsletter: boolean;
}

export default function NotificationsSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email_notifications: true,
    push_notifications: false,
    sms_notifications: false,
    order_updates: true,
    promotions: true,
    new_products: false,
    newsletter: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);

    try {
      const response = await apiClient.get<{data: NotificationSettings}>(
        "notification-settings"
      );

      // if (response.success) {
      setSettings(response.data);
      // }
    } catch (error) {
      console.error("Failed to fetch notification settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (name: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    // Clear success message when user changes settings
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const response = await apiClient.put<{success: boolean}>(
        "notification-settings",
        settings
      );

      if (response.success) {
        setSaveSuccess(true);
      }
    } catch (error) {
      console.error("Failed to save notification settings:", error);
      alert("Failed to save notification settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">
          Notification Settings
        </h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-textPrimary mb-6">
        Notification Settings
      </h2>

      {saveSuccess && (
        <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md">
          Notification settings saved successfully!
        </div>
      )}

      <div className="space-y-8">
        {/* Notification Channels */}
        <div>
          <h3 className="text-lg font-medium text-textPrimary mb-4">
            Notification Channels
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label
                  htmlFor="email_notifications"
                  className="text-base font-medium"
                >
                  Email Notifications
                </Label>
                <p className="text-sm text-textSecondary">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email_notifications"
                checked={settings.email_notifications}
                onCheckedChange={() => handleToggle("email_notifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label
                  htmlFor="push_notifications"
                  className="text-base font-medium"
                >
                  Push Notifications
                </Label>
                <p className="text-sm text-textSecondary">
                  Receive notifications on your device
                </p>
              </div>
              <Switch
                id="push_notifications"
                checked={settings.push_notifications}
                onCheckedChange={() => handleToggle("push_notifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label
                  htmlFor="sms_notifications"
                  className="text-base font-medium"
                >
                  SMS Notifications
                </Label>
                <p className="text-sm text-textSecondary">
                  Receive notifications via text message
                </p>
              </div>
              <Switch
                id="sms_notifications"
                checked={settings.sms_notifications}
                onCheckedChange={() => handleToggle("sms_notifications")}
              />
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h3 className="text-lg font-medium text-textPrimary mb-4">
            What You&apos;ll Receive
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label
                  htmlFor="order_updates"
                  className="text-base font-medium"
                >
                  Order Updates
                </Label>
                <p className="text-sm text-textSecondary">
                  Status changes, shipping confirmations, and delivery updates
                </p>
              </div>
              <Switch
                id="order_updates"
                checked={settings.order_updates}
                onCheckedChange={() => handleToggle("order_updates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions" className="text-base font-medium">
                  Promotions & Discounts
                </Label>
                <p className="text-sm text-textSecondary">
                  Sales, special offers, and promotional codes
                </p>
              </div>
              <Switch
                id="promotions"
                checked={settings.promotions}
                onCheckedChange={() => handleToggle("promotions")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="new_products" className="text-base font-medium">
                  New Products
                </Label>
                <p className="text-sm text-textSecondary">
                  Updates about new product launches
                </p>
              </div>
              <Switch
                id="new_products"
                checked={settings.new_products}
                onCheckedChange={() => handleToggle("new_products")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newsletter" className="text-base font-medium">
                  Newsletter
                </Label>
                <p className="text-sm text-textSecondary">
                  Regular updates about our company and industry
                </p>
              </div>
              <Switch
                id="newsletter"
                checked={settings.newsletter}
                onCheckedChange={() => handleToggle("newsletter")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button
          onClick={handleSaveSettings}
          className="w-full bg-bg_primary hover:bg-btn_hover"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
