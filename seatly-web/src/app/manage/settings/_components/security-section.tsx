import SettingsSection from "@/app/manage/settings/_components/settings-section";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useChangePasswordMutation } from "@/queries/use-account";
import {
  ChangePasswordBody,
  type ChangePasswordBodyType,
} from "@/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SecuritySection() {
  const changePasswordMutation = useChangePasswordMutation();

  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetChangePasswordForm = () => {
    form.reset({ oldPassword: "", password: "", confirmPassword: "" });
  };

  const onSubmit = form.handleSubmit(async (values) => {
    if (changePasswordMutation.isPending) return;

    try {
      const result = await changePasswordMutation.mutateAsync(values);
      toast.success(result.payload.message);
      handleResetChangePasswordForm();
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  });

  return (
    <Form {...form}>
      <form noValidate onSubmit={onSubmit}>
        <SettingsSection
          title="Password & security"
          description="Choose a strong password to keep your account secure."
          icon={KeyRound}
          footer={
            <>
              <Button
                type="button"
                variant="ghost"
                className="w-full sm:w-auto"
                disabled={changePasswordMutation.isPending}
                onClick={handleResetChangePasswordForm}
              >
                Cancel
              </Button>
              <SubmitButton
                isLoading={changePasswordMutation.isPending}
                className="w-full sm:w-auto"
              >
                Update password
              </SubmitButton>
            </>
          }
        >
          <div className="grid max-w-xl gap-5">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="settings-old-password">
                    Current password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="settings-old-password"
                      type="password"
                      placeholder="Enter your current password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="settings-new-password">
                    New password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="settings-new-password"
                      type="password"
                      placeholder="At least 6 characters"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="settings-confirm-password">
                    Confirm new password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="settings-confirm-password"
                      type="password"
                      placeholder="Re-enter your new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </SettingsSection>
      </form>
    </Form>
  );
}
