import { TokenPayload } from "@/types/jwt.type";
import jwt from "jsonwebtoken";

// This helper is imported by `src/middleware.ts`, so it must stay safe for the Edge Runtime.
// When keeping `decodeToken` in its own file, avoid importing anything that could pull in
// Node-only or Edge-incompatible libraries through the dependency graph.
// `src/lib/utils.ts` is no longer a concern here because it does not bring in things like
// `socket.io-client` anymore; at most it may expose lightweight helpers such as `cn`.
// Treat this file as an isolated, middleware-safe utility and keep its imports minimal.
export const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayload;
};
