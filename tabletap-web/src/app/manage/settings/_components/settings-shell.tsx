import SettingsNav from "@/app/manage/settings/_components/settings-nav";

interface SettingsShellProps {
  children: React.ReactNode;
}

export default function SettingsShell({ children }: SettingsShellProps) {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <SettingsNav />
      <div className="min-w-0 space-y-6">{children}</div>
    </div>
  );
}
