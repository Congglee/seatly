import envConfig from "@/config/environment";
import { io } from "socket.io-client";

export const generateSocketInstace = (accessToken: string) => {
  return io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
    auth: { Authorization: `Bearer ${accessToken}` },
  });
};
