import http from "@/lib/http";
import type {
  RefreshTokenBodyType,
  RefreshTokenResType,
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
} from "@/schemas/auth.schema";

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,

  loginFromServer: (body: LoginBodyType) =>
    http.post<LoginResType>("/auth/login", body),

  loginFromClient: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body, { baseUrl: "" }),

  logoutFromServer: (body: LogoutBodyType & { accessToken: string }) =>
    http.post(
      "/auth/logout",
      { refreshToken: body.refreshToken },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),

  // Client calls the route handler without passing access token and refresh token because it automatically sends them through cookies
  logoutFromClient: () => http.post("/api/auth/logout", null, { baseUrl: "" }),

  refreshTokenFromServer: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("/auth/refresh-token", body),

  // Switch from an arrow function to a regular function so the `this` keyword can be used
  async refreshTokenFromClient() {
    // Avoid duplicate requests when called multiple times simultaneously, which could cause the next call to fail with 401 due to using an old refresh token

    // If there is already a refresh token request in progress (refreshTokenRequest !== null), return that same request
    // This ensures the previous request finishes before the next one runs
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }

    // If there is no pending refresh token request, call the refresh token API
    this.refreshTokenRequest = http.post<RefreshTokenResType>(
      "/api/auth/refresh-token",
      null,
      { baseUrl: "" }
    );

    const result = await this.refreshTokenRequest;

    // After calling the refresh token API, reset refreshTokenRequest back to null
    this.refreshTokenRequest = null;

    return result;
  },

  setTokenToCookie: (body: { accessToken: string; refreshToken: string }) =>
    http.post("/api/auth/token", body, { baseUrl: "" }),
};

export default authApiRequest;
