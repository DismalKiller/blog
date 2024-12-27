import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header/Header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Hyun's blog",
  description: "Hyun's blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("referer") || "";
  const isAdmin = pathname.includes("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-black bg-gray-100 dark:text-gray-100 text-black">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {!isAdmin && <Header />}
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
