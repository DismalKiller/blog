import HeaderNav from "@/components/Header/HeaderNav";
import Switch from "@/components/Header/Switch";
export default function Index() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 ">
        <div className=" leading-6 text-gray-900">&nbsp;</div>
        <HeaderNav />
        <div>
          <Switch />
        </div>
      </nav>
    </header>
  );
}
