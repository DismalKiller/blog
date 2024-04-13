import HeaderNav from "@/components/Header/HeaderNav";
import dynamic from "next/dynamic";

export default function Index() {
  const Switch = dynamic(() => import("@/components/Header/Switch"), {
    ssr: false,
  });
  return (
    <header>
      <nav className="flex items-center justify-between p-6  bg-gray-50 dark:bg-gray-950 h-[7vh] dark:border-gray-900 border-gray-200 border-b-2">
        <div className=" leading-6 text-gray-900">&nbsp;</div>
        <HeaderNav />
        <div>
          <Switch />
        </div>
      </nav>
    </header>
  );
}
