"use client";

import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils/token-storage";
import { useLogoutMutation } from "@/queries/use-auth";
import { useAppStore } from "@/providers/app-provider";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { memo, Suspense, useEffect, useRef } from "react";

function SignOut() {
  const router = useRouter();

  const { mutateAsync } = useLogoutMutation();

  const ref = useRef<any>(null);

  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");

  const disconnectSocket = useAppStore((state) => state.disconnectSocket);
  const setRole = useAppStore((state) => state.setRole);

  /*
   * This `useEffect` would cause the component to re-render infinitely
   *  Reason:
   *    1. logoutMutation is an object (because it is an object, it has properties like `.mutateAsync` or `.isLoading`)
   *    2. Calling `.mutateAsync` changes that object's reference
   *    3. When the object's reference changes, this useEffect runs again and the component re-renders ==> causing an infinite loop
   */

  // const logoutMutation = useLogoutMutation();
  // useEffect(() => {
  //   logoutMutation.mutateAsync().then((res) => {
  //     router.push("/login");
  //   });
  // }, [logoutMutation, router]);

  useEffect(() => {
    // Use ref to avoid calling the API twice and to prevent continuous API calls

    if (
      !ref.current &&
      ((refreshTokenFromUrl &&
        refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) ||
        (accessTokenFromUrl &&
          accessTokenFromUrl === getAccessTokenFromLocalStorage()))
    ) {
      ref.current = mutateAsync;

      mutateAsync().then(() => {
        setTimeout(() => {
          ref.current = null;
        }, 1000);

        setRole(undefined);

        disconnectSocket();

        // No need to redirect to the login page because logging out will automatically redirect there
        // router.push("/login");
      });
    } else if (accessTokenFromUrl !== getAccessTokenFromLocalStorage()) {
      // If the access token from the URL does not match the access token in local storage, redirect to the home page
      // This prevents a user from sending this logout link to someone else and having them access this page
      router.push("/");
    }
    // Used as a safeguard in case someone gets this logout URL and sends it to someone else
    // Then they open this page and, because there is no token, they should be redirected to the home page
    // else {
    //   router.push("/");
    // }
  }, [
    mutateAsync,
    router,
    refreshTokenFromUrl,
    accessTokenFromUrl,
    setRole,
    disconnectSocket,
  ]);

  return null;
}

const Logout = memo(function LogoutInner() {
  return (
    <Suspense>
      <SignOut />
    </Suspense>
  );
});

export default Logout;
