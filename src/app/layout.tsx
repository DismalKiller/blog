import type { Metadata } from "next";
import "./globals.css";
import Index from "@/components/Header";
export const metadata: Metadata = {
  title: "Hyun's blog",
  description: "Hyun's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900 bg-gray-100 dark:text-gray-100 text-gray-900">
        <Index />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
