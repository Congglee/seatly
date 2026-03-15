"use client";

import { useRouter } from "next/navigation";
import { refreshTokensIfNeeded } from "@/lib/utils/auth-client";
import { getRefreshTokenFromLocalStorage } from "@/lib/utils/token-storage";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/loader";

export default function RefreshTokenHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the refreshToken from the URL search params set in the middleware
  const refreshTokenFromUrl = searchParams.get("refreshToken");

  // Get the redirect path from the URL search params set in the middleware
  // Used to redirect to the intended page after refreshing the token
  const redirectPathname = searchParams.get("redirect");

  useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl === getRefreshTokenFromLocalStorage()
    ) {
      refreshTokensIfNeeded({
        onSuccess: () => {
          router.push(redirectPathname || "/");
        },
      });
    } else {
      // Used as a safeguard in case someone gets this restore-session URL and sends it to someone else
      // Then they open this page and, because there is no token, they should be redirected to the home page
      router.push("/");
    }
  }, [router, refreshTokenFromUrl, redirectPathname]);

  return <Loader fullPage message="Restoring session..." />;
}
