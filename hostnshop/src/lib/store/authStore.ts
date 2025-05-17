// src/lib/store/authStore.ts
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {AuthResponse} from "@/shared/types";

interface AuthStore {
  user: AuthResponse["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthResponse["user"]>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (data) => {
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        const {user} = get();
        if (user) {
          set({user: {...user, ...userData}});
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
