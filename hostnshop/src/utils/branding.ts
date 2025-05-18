// src/utils/branding.ts
import { useEffect, useState } from 'react';

interface Branding {
  appName: string;
  appDescription: string;
  contactEmail: string;
  contactPhone: string;
  logoPath: string;
  faviconPath: string;
}

const defaultBranding: Branding = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'HostNShop',
  appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'E-commerce application',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@hostnshop.com',
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+1 (555) 123-4567',
  logoPath: process.env.NEXT_PUBLIC_LOGO_PATH || '/assets/images/HostNShop.png',
  faviconPath: process.env.NEXT_PUBLIC_FAVICON_PATH || '/favicon.ico',
};

// Hook to get branding information
export function useBranding(): Branding {
  const [branding, setBranding] = useState<Branding>(defaultBranding);

  useEffect(() => {
    async function loadBranding() {
      try {
        const response = await fetch('/branding.json');
        if (response.ok) {
          const data = await response.json();
          setBranding({
            ...defaultBranding,
            ...data,
          });
        }
      } catch (error) {
        console.error('Failed to load branding:', error);
      }
    }

    loadBranding();
  }, []);

  return branding;
}

// Function to get branding information during SSR/SSG
export async function getBranding(): Promise<Branding> {
  if (typeof window === 'undefined') {
    // Running on the server - return default values from env
    return defaultBranding;
  }

  try {
    const response = await fetch('/branding.json');
    if (response.ok) {
      const data = await response.json();
      return {
        ...defaultBranding,
        ...data,
      };
    }
  } catch (error) {
    console.error('Failed to load branding:', error);
  }
  
  return defaultBranding;
}
