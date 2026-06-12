import Logo from "@/components/logo";
import { LANDING_NAV_ITEMS } from "@/constants/landing-content";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Logo />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Web app gọn cho phục vụ tại bàn bằng QR — dành cho quán ăn và quán
              nước nhỏ đến vừa.
            </p>
          </div>

          <nav aria-label="Liên kết chân trang">
            <ul className="flex flex-col gap-2 sm:items-end">
              {LANDING_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/login"
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Đăng nhập quản lý
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {currentYear} Seatly. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
