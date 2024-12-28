import HeaderNav from "./HeaderNav";
import UserInfo from "./User";
import Switch from "./Switch";
import Logo from "./Logo";

export default async function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between p-6 bg-gray-50 dark:bg-black h-[7vh] dark:border-gray-900 border-gray-200 border-b-2">
        <div className="flex-1">
          <Logo />
        </div>
        <HeaderNav />
        <div className="flex-1 flex justify-end items-center gap-2">
          <Switch />
          <UserInfo />
        </div>
      </nav>
    </header>
  );
}
