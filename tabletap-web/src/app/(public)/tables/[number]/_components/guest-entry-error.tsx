import { HttpError } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export type GuestEntryTokenErrorType =
  | "missing-token"
  | "invalid-token"
  | "expired-token"
  | "unknown-token";

type GuestEntryTokenErrorContent = {
  title: string;
  description: string;
  actionLabel: string;
};

export const GUEST_ENTRY_TOKEN_ERROR_CONTENT: Record<
  GuestEntryTokenErrorType,
  GuestEntryTokenErrorContent
> = {
  "missing-token": {
    title: "Missing table token",
    description:
      "This table link is incomplete. Please scan the QR code again to continue.",
    actionLabel: "Back to homepage",
  },
  "invalid-token": {
    title: "Invalid table token",
    description:
      "This table link is no longer valid. Please ask staff for a new QR code.",
    actionLabel: "Back to homepage",
  },
  "expired-token": {
    title: "Expired table token",
    description:
      "This table token has expired. Please scan the latest QR code to join.",
    actionLabel: "Back to homepage",
  },
  "unknown-token": {
    title: "Cannot verify table token",
    description:
      "We could not verify this table token right now. Please try again with a fresh QR code.",
    actionLabel: "Back to homepage",
  },
};

const TOKEN_ERROR_PATTERNS: Array<{
  type: Exclude<GuestEntryTokenErrorType, "missing-token" | "unknown-token">;
  pattern: RegExp;
}> = [
  {
    type: "expired-token",
    pattern: /token.*expired|expired.*token/i,
  },
  {
    type: "invalid-token",
    pattern: /token.*invalid|invalid.*token|token.*incorrect|incorrect.*token/i,
  },
];

const getErrorMessage = (error: unknown) => {
  if (error instanceof HttpError) {
    return typeof error.payload?.message === "string"
      ? error.payload.message
      : "";
  }

  if (typeof error === "object" && error !== null && "payload" in error) {
    const payload = (error as { payload?: { message?: unknown } }).payload;

    return typeof payload?.message === "string" ? payload.message : "";
  }

  return "";
};

export const resolveGuestEntryTokenErrorType = ({
  token,
  error,
}: {
  token?: string | null;
  error?: unknown;
}): GuestEntryTokenErrorType | null => {
  const normalizedToken = token?.trim() ?? "";

  if (!normalizedToken) {
    return "missing-token";
  }

  if (!error) {
    return null;
  }

  const message = getErrorMessage(error);

  if (!message.toLowerCase().includes("token")) {
    return null;
  }

  const matchedPattern = TOKEN_ERROR_PATTERNS.find((item) =>
    item.pattern.test(message)
  );

  return matchedPattern?.type ?? "unknown-token";
};

interface GuestEntryErrorProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function GuestEntryError({
  title,
  description,
  actionLabel = "Try again",
  onAction,
}: GuestEntryErrorProps) {
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto px-4 text-center">
      <div className="flex items-center justify-center size-20 rounded-2xl bg-destructive/10">
        <AlertTriangle className="size-9 text-destructive" strokeWidth={1.5} />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
          {description}
        </p>
      </div>
      <div className="w-full pt-2">
        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 rounded-xl text-sm font-medium"
          onClick={onAction ?? (() => window.location.reload())}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
