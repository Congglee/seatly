import envConfig from "@/config/environment";
import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/lib/utils/token-storage";
import { normalizePath } from "@/lib/utils/path";
import { LoginResType } from "@/schemas/auth.schema";
import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

// HttpError is the base error type for failed API requests.
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({
    status,
    payload,
    message = "HTTP Error",
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

// EntityError represents a 422 response, typically caused by invalid form data.
export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload, message: "Entity Error" });
    this.status = status;
    this.payload = payload;
  }
}

// Stores the in-flight client logout request to prevent duplicate calls.
let clientLogoutRequest: null | Promise<any> = null;

// Indicates whether the current request runs in the browser.
const isClient = typeof window !== "undefined";

/**
 * Sends an HTTP request to the configured API endpoint and returns the parsed response.
 *
 * This helper centralizes request setup, including JSON serialization, `FormData` handling,
 * `Authorization` header injection, response parsing, token persistence, and authentication
 * error handling for both client-side and server-side execution.
 *
 * @template Response
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method The HTTP method to use.
 * @param {string} url The endpoint path relative to the selected `baseUrl`.
 * @param {CustomOptions} [options] Optional fetch configuration such as headers, body, and base URL override.
 * @returns {Promise<{ status: number; payload: Response }>} A promise resolving to the response status and parsed payload.
 * @throws {EntityError} Thrown when the server returns `422` validation errors.
 * @throws {HttpError} Thrown when the server returns any non-success status other than handled authentication redirects.
 */
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: { [key: string]: string } =
    body instanceof FormData ? {} : { "Content-Type": "application/json" };

  if (isClient) {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  // Use the default API endpoint unless a custom baseUrl is provided.
  // Passing an empty string targets the Next.js server itself.
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: { ...baseHeaders, ...options?.headers } as any,
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = { status: res.status, payload };

  // Handle response errors before returning data to callers.
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      // A 422 response usually indicates invalid form input.
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      // A 401 response usually means authentication failed, the token expired, or access is denied.

      if (isClient) {
        // On the client, call the logout route handler and redirect back to the login page.
        if (!clientLogoutRequest) {
          // The logout route handler is only available from the client.
          clientLogoutRequest = fetch("/api/auth/logout", {
            method: "POST",
            body: null, // Logout should always be treated as successful.
            headers: { ...baseHeaders } as any,
          });

          try {
            // Execute the logout request.
            await clientLogoutRequest;
          } catch (error) {
            console.log(error);
          } finally {
            // clientSessionToken.expiresAt = new Date().toISOString();
            // clientSessionToken.value = "";

            // Even if logout fails, clear local tokens, reset the shared request, and send the user to login.
            removeTokensFromLocalStorage();
            clientLogoutRequest = null;

            // Redirecting to login can cause loops if that page immediately makes protected API calls.
            location.href = `/login`;
          }
        }
      } else {
        // Handle authenticated requests sent from the Next.js server to the backend.

        // On the server, extract the access token from the Authorization header.
        const accessToken = (options?.headers as any).Authorization.split(
          "Bearer "
        );

        // Keep the token in the query string for follow-up auth handling if needed.
        // redirect(`/logout?accessToken=${accessToken}` );
        // redirect({
        //   href: `/logout?accessToken=${accessToken}`,
        //   locale: locale as string,
        // });

        redirect(`/login?accessToken=${accessToken}`);
      }
    } else {
      throw new HttpError(data);
    }
  }

  if (isClient) {
    const normalizeUrl = normalizePath(url);
    if (["api/auth/login", "api/guest/auth/login"].includes(normalizeUrl)) {
      // Persist tokens after a successful client-side login request.
      const { accessToken, refreshToken } = (payload as LoginResType).data;
      setAccessTokenToLocalStorage(accessToken);
      setRefreshTokenToLocalStorage(refreshToken);
    } else if ("api/auth/token" === normalizeUrl) {
      const { accessToken, refreshToken } = payload as {
        accessToken: string;
        refreshToken: string;
      };

      setAccessTokenToLocalStorage(accessToken);
      setRefreshTokenToLocalStorage(refreshToken);
    } else if (
      ["api/auth/logout", "api/guest/auth/logout"].includes(normalizeUrl)
    ) {
      // Clear stored tokens after a successful client-side logout request.
      removeTokensFromLocalStorage();
    }
  }
  return data;
};

/**
 * Provides typed convenience wrappers for the application's HTTP methods.
 *
 * Each method delegates to `request`, preserving the same response shape while
 * automatically assigning the correct HTTP verb.
 *
 * @type {{
 *   get: <Response>(url: string, options?: Omit<CustomOptions, "body"> | undefined) => Promise<{ status: number; payload: Response }>;
 *   post: <Response>(url: string, body: any, options?: Omit<CustomOptions, "body"> | undefined) => Promise<{ status: number; payload: Response }>;
 *   put: <Response>(url: string, body: any, options?: Omit<CustomOptions, "body"> | undefined) => Promise<{ status: number; payload: Response }>;
 *   delete: <Response>(url: string, options?: Omit<CustomOptions, "body"> | undefined) => Promise<{ status: number; payload: Response }>;
 * }}
 */
const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },

  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },

  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },

  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
