import { Toaster } from "@/components/ui/sonner";
import AppProvider from "@/providers/app-provider";
import QueryProvider from "@/providers/query-provider";
import ThemeProvider from "@/providers/theme-provider";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Seatly",
  description: "Seatly is a platform for managing your small restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <NextTopLoader
          color="hsl(var(--muted-foreground))"
          showSpinner={false}
        />
        <QueryProvider>
          <AppProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors />
            </ThemeProvider>
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
