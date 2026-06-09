import { toast } from "sonner";
import { EntityError } from "@/lib/http";
import { UseFormSetError } from "react-hook-form";

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast.error(error?.payload?.message ?? "Unknown error", {
      duration: duration ?? 5000,
    });
  }
};
