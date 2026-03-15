import { Role } from "@/constants/type";
import { decodeToken } from "@/lib/jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const managePaths = ["/manage"];
const guestPaths = ["/guest"];
const privatePaths = [...managePaths, ...guestPaths];

const onlyOwnerPaths = ["/manage/accounts"];

const unAuthPaths = ["/login"];

// Paths for the login page
const loginPaths = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Unauthenticated users cannot access private routes.
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    const url = new URL(`/login`, request.url);

    // Add the `clearTokens` param so local storage tokens can be cleared on the login page.
    url.searchParams.set("clearTokens", "true");

    return NextResponse.redirect(url);
  }

  // Authenticated case.
  if (refreshToken) {
    // Redirect authenticated users away from the login page.
    if (unAuthPaths.some((path) => pathname.startsWith(path)) && refreshToken) {
      // If the current path is a login route, keep checking for `accessToken`.
      // If `accessToken` exists, allow the request to continue.
      // This avoids creating a separate logout page and handles the flow directly on the login page.
      if (
        loginPaths.some((path) => pathname.startsWith(path)) &&
        searchParams.get("accessToken")
      ) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/", request.url));
    }

    // The user is logged in, but the access token has expired.
    if (
      privatePaths.some((path) => pathname.startsWith(path)) &&
      !accessToken
    ) {
      const url = new URL("/restore-session", request.url);

      // Put `refreshToken` and the redirect path into the URL search params
      // so the client can read them with `useSearchParams`.
      url.searchParams.set("refreshToken", refreshToken ?? "");
      url.searchParams.set("redirect", pathname);

      return NextResponse.redirect(url);
    }

    // Redirect to the home page when the user accesses a route with the wrong role.
    const role = decodeToken(refreshToken).role;

    // A guest is trying to access a manage route.
    const isGuestGoToManagePath =
      role === Role.Guest &&
      managePaths.some((path) => pathname.startsWith(path));

    // A non-guest user is trying to access a guest route.
    const isNotGuestGoToGuestPath =
      role !== Role.Guest &&
      guestPaths.some((path) => pathname.startsWith(path));

    // A non-owner user is trying to access owner-only routes.
    const isNotOwnerGoToOwnerPath =
      role !== Role.Owner &&
      onlyOwnerPaths.some((path) => pathname.startsWith(path));

    if (
      isGuestGoToManagePath ||
      isNotGuestGoToGuestPath ||
      isNotOwnerGoToOwnerPath
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/manage/:path*", "/guest/:path*", "/login"],
};
