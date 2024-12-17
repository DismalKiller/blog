import HeaderNav from "./HeaderNav";
import Image from "next/image";
import Switch from "./Switch";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between p-6  bg-gray-50 dark:bg-black h-[7vh] dark:border-gray-900 border-gray-200 border-b-2">
        <div className="flex items-center gap-2 flex-1">
          <Image
            src="/logo.png"
            className="filter invert dark:invert-0"
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="text-2xl font-bold">Hyun's Blog</h1>
        </div>
        <HeaderNav />
        <div className="flex-1 flex justify-end">
          <Switch />
        </div>
      </nav>
    </header>
  );
}
