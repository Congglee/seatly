"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthSwitcher() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <Button variant="secondary" asChild>
      <Link href={isLogin ? "/register" : "/login"}>
        {isLogin ? "Register" : "Login"}
      </Link>
    </Button>
  );
}
