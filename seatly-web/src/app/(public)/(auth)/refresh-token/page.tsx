import RefreshTokenHandler from "@/app/(public)/(auth)/refresh-token/_components/refresh-token-handler";
import { Suspense } from "react";

export default function RefreshToken() {
  return (
    <Suspense>
      <RefreshTokenHandler />
    </Suspense>
  );
}
