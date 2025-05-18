/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/api/client.ts

import {useAuthStore} from "../store/authStore";

interface FetchOptions extends RequestInit {
  token?: boolean;
  refreshOnUnauthorized?: boolean;
}

/**
 * API client for making HTTP requests to the backend API
 */
export const apiClient = {
  // Default base URL
  baseUrl: "http://localhost:3000/api",

  /**
   * Set the base URL for all API requests
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  },

  /**
   * Get the current base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  },

  /**
   * Base fetch method with authentication and refresh token handling
   */
  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    console.log("Access Token:");

    const {
      token = true,
      refreshOnUnauthorized = true,
      ...fetchOptions
    } = options;

    const {accessToken, refreshToken, logout} = useAuthStore.getState();

    // console.log("Access Token:" + accessToken);
    // console.log("Refresh Token:" + refreshToken);

    const headers = new Headers(fetchOptions.headers);

    // Add content-type if not specified and body is not FormData
    if (
      !headers.has("Content-Type") &&
      !(fetchOptions.body instanceof FormData)
    ) {
      headers.set("Content-Type", "application/json");
    }

    // Add authorization token if needed
    if (token && accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    // Build the full URL with the base URL
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, "")}`;

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle token refresh on 401 errors
    if (response.status === 401 && refreshOnUnauthorized && refreshToken) {
      try {
        const refreshResponse = await fetch(`${this.baseUrl}/auth/refresh`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({refreshToken}),
        });

        const refreshData = await refreshResponse.json();

        if (refreshResponse.ok && refreshData.success) {
          // Update tokens and retry request
          useAuthStore.setState({
            accessToken: refreshData.data.accessToken,
            refreshToken: refreshData.data.refreshToken,
          });

          // Retry original request with new token
          return this.fetch(endpoint, {
            ...options,
            refreshOnUnauthorized: false,
          });
        } else {
          // If refresh failed, log the user out
          logout();
          throw new Error("Session expired. Please login again.");
        }
      } catch (error) {
        logout();
        throw error;
      }
    }

    // Handle other response types
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred during the request");
    }

    return data;
  },

  /**
   * GET request helper
   */
  async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {...options, method: "GET"});
  },

  /**
   * POST request helper
   */
  async post<T>(
    endpoint: string,
    data: any,
    options: FetchOptions = {}
  ): Promise<T> {
    console.log("Access Token:1a");

    return this.fetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * PUT request helper
   */
  async put<T>(
    endpoint: string,
    data: any,
    options: FetchOptions = {}
  ): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  /**
   * DELETE request helper
   */
  async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {...options, method: "DELETE"});
  },
};
