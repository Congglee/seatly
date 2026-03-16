import { Loader2 } from "lucide-react";

const DEFAULT_MESSAGE = "Loading...";

interface LoaderProps {
  message?: string;
  fullPage?: boolean;
}

export default function Loader({
  message = DEFAULT_MESSAGE,
  fullPage = false,
}: LoaderProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className="h-8 w-8 animate-spin text-muted-foreground"
        aria-hidden
      />
      {message && (
        <p
          className="text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        role="alert"
        aria-busy="true"
        aria-label={message}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="flex h-full min-h-[120px] items-center justify-center pt-8"
      role="status"
      aria-label={message}
    >
      {content}
    </div>
  );
}
