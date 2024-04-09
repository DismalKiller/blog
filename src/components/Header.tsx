import HeaderNav from "@/components/HeaderNav";
export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 ">
        <div className=" leading-6 text-gray-900">&nbsp;</div>
        <HeaderNav />
        <div>&nbsp;</div>
      </nav>
    </header>
  );
}
