import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

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
      <body className='bg-gray-900 dark:bg-blend-color'>
      <Header/>
      <main>
        {children}
      </main>
      </body>
    </html>
  );
}
