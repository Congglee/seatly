import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

export interface SubmitButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, isLoading = false, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type="submit"
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {children}
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
