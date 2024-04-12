import HeaderNav from "@/components/Header/HeaderNav";
import dynamic from "next/dynamic";

export default function Index() {
  const Switch = dynamic(() => import("@/components/Header/Switch"), {
    ssr: false,
  });
  return (
    <header>
      <nav className="flex items-center justify-between p-6  bg-gray-150 dark:bg-gray-950">
        <div className=" leading-6 text-gray-900">&nbsp;</div>
        <HeaderNav />
        <div>
          <Switch />
        </div>
      </nav>
    </header>
  );
}
