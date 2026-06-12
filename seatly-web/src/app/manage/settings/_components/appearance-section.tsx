import SettingsSection from "@/app/manage/settings/_components/settings-section";
import ThemePreview from "@/app/manage/settings/_components/theme-preview";
import { themeOptions } from "@/constants/options";
import { cn } from "@/lib/utils";
import { Check, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? theme ?? "system" : undefined;

  return (
    <SettingsSection
      title="Giao diện"
      description="Tùy chỉnh cách Seatly hiển thị trên thiết bị này."
      icon={Palette}
    >
      <fieldset>
        <legend className="sr-only">Tùy chọn giao diện</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = activeTheme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "group flex flex-col gap-3 rounded-lg border p-3 text-left transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary/50 bg-primary/5 shadow-sm"
                    : "border-border hover:border-muted-foreground/40 hover:bg-muted/40"
                )}
              >
                <ThemePreview variant={option.preview} />
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon
                      className={cn(
                        "size-4",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                  </div>
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-transparent"
                    )}
                  >
                    <Check className="size-3" />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </fieldset>
    </SettingsSection>
  );
}
