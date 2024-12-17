import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header/Header";
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
      <body className="dark:bg-black bg-gray-100 dark:text-gray-100 text-black">
        <Header />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
