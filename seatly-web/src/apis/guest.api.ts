import http from "@/lib/http";
import {
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
} from "@/schemas/auth.schema";
import {
  GuestCreateOrdersBodyType,
  GuestCreateOrdersResType,
  GuestGetOrdersResType,
  GuestLoginBodyType,
  GuestLoginResType,
} from "@/schemas/guest.schema";

const guestApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,

  loginFromServer: (body: GuestLoginBodyType) =>
    http.post<GuestLoginResType>("/guest/auth/login", body),

  loginFromClient: (body: GuestLoginBodyType) =>
    http.post<GuestLoginResType>("/api/guest/auth/login", body, {
      baseUrl: "",
    }),

  logoutFromServer: (body: LogoutBodyType & { accessToken: string }) =>
    http.post(
      "/guest/auth/logout",
      { refreshToken: body.refreshToken },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),

  // The client calls the route handler without passing the access token and refresh token because they are sent automatically via cookies.
  logoutFromClient: () =>
    http.post("/api/guest/auth/logout", null, { baseUrl: "" }),

  refreshTokenFromServer: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("/guest/auth/refresh-token", body),

  // Switched from an arrow function to a regular function so the `this` keyword can be used.
  async refreshTokenFromClient() {
    // Prevent duplicate requests when called multiple times simultaneously, which could cause the next call to fail with a 401 because it uses an old refresh token.

    // If there is already a refresh token request in progress (refreshTokenRequest !== null), return that same request.
    // This ensures the previous request finishes before the next one starts.
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }

    // If there is no pending refresh token request, call the refresh token API.
    this.refreshTokenRequest = http.post<RefreshTokenResType>(
      "/api/guest/auth/refresh-token",
      null,
      { baseUrl: "" }
    );

    const result = await this.refreshTokenRequest;

    // After the refresh token API call completes, reset refreshTokenRequest back to null.
    this.refreshTokenRequest = null;

    return result;
  },

  orderDish: (body: GuestCreateOrdersBodyType) =>
    http.post<GuestCreateOrdersResType>("/guest/orders", body),

  getOrderList: () => http.get<GuestGetOrdersResType>("/guest/orders"),
};

export default guestApiRequest;
