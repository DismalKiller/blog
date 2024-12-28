"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  let clickCount = 0;
  let doubleClick = false;
  const handleClick = () => {
    clickCount++;
    if (clickCount === 2) {
      setTimeout(() => {
        doubleClick = true;
      }, 1000);
      setTimeout(() => {
        doubleClick = false;
      }, 3000);
    }
    if (clickCount === 5 && doubleClick) {
      router.push("/admin");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        className="filter invert dark:invert-0 cursor-pointer"
        alt="logo"
        width={100}
        height={100}
        onClick={handleClick}
      />
      <h1 className="text-2xl font-bold">Hyun&apos;s Blog</h1>
    </div>
  );
}
