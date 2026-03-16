import authApiRequest from "@/apis/auth.api";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  if (!accessToken || !refreshToken) {
    return Response.json(
      { message: "Cannot get access token or refresh token" },
      { status: 200 }
    );
  }

  try {
    const result = await authApiRequest.logoutFromServer({
      accessToken,
      refreshToken,
    });

    return Response.json(result.payload);
  } catch (error) {
    return Response.json(
      { message: "Error when calling API to server backend" },
      { status: 200 }
    );
  }
}
