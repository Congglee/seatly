import authApiRequest from "@/apis/auth.api";
import { LoginBodyType } from "@/schemas/auth.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/lib/http";
import { NextRequest } from "next/server";

// Whatever the backend server API returns, the Next.js server will also return to the client
export async function POST(request: NextRequest) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = cookies();

  try {
    const { payload } = await authApiRequest.loginFromServer(body);
    const { accessToken, refreshToken } = payload.data;

    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };

    // Store the access token and refresh token in cookies so that:
    // Server Components can use cookies to verify whether the user is logged in (because Server Components cannot access the client's localStorage)
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });

    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status });
    } else {
      return Response.json({ message: "An error occurred" }, { status: 500 });
    }
  }
}
