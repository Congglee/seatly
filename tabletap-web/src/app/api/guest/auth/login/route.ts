import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/lib/http";
import { GuestLoginBodyType } from "@/schemas/guest.schema";
import guestApiRequest from "@/apis/guest.api";
import { NextRequest } from "next/server";

// API từ server backend trả về những gì thì Next.js server cũng sẽ trả về những gì cho client
export async function POST(request: NextRequest) {
  const body = (await request.json()) as GuestLoginBodyType;
  const cookieStore = cookies();

  try {
    const { payload } = await guestApiRequest.loginFromServer(body);
    const { accessToken, refreshToken } = payload.data;

    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };

    // Lưu access token và refresh token vào cookie để phục vụ cho việc:
    // Server Component sẽ sử dụng cookie để xác thực người dùng đã login hay chưa (do server component không thể truy cập vào localStorage của client)
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
