import authApiRequest from "@/apis/auth.api";
import guestApiRequest from "@/apis/guest.api";
import { Role } from "@/constants/type";
import { decodeToken } from "@/lib/jwt-decode";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/lib/utils/token-storage";

export const refreshTokensIfNeeded = async (params?: {
  onError?: () => void;
  onSuccess?: () => void;
  force?: boolean;
}) => {
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();

  if (!accessToken || !refreshToken) {
    return;
  }

  const decodedAccessToken = decodeToken(accessToken);
  const decodedRefreshToken = decodeToken(refreshToken);
  const now = new Date().getTime() / 1000 - 1;

  if (decodedRefreshToken.exp <= now) {
    console.log("Refresh token hết hạn");
    removeTokensFromLocalStorage();
    return params?.onError && params.onError();
  }

  if (
    params?.force ||
    decodedAccessToken.exp - now <
      (decodedAccessToken.exp - decodedAccessToken.iat) / 3
  ) {
    try {
      const role = decodedRefreshToken.role;
      const res =
        role === Role.Guest
          ? await guestApiRequest.refreshTokenFromClient()
          : await authApiRequest.refreshTokenFromClient();
      setAccessTokenToLocalStorage(res.payload.data.accessToken);
      setRefreshTokenToLocalStorage(res.payload.data.refreshToken);
      params?.onSuccess && params.onSuccess();
    } catch {
      params?.onError && params.onError();
    }
  }
};

export const getRoleFromClient = () => {
  const accessToken = getAccessTokenFromLocalStorage();
  return accessToken ? decodeToken(accessToken).role : undefined;
};
