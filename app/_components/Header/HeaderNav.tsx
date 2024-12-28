import NavButton from "./NavButton";

const navigation = [
  { name: "Home", href: "home" },
  { name: "Articles", href: "articles" },
  { name: "Projects", href: "projects" },
  { name: "About", href: "about" },
];

export default function Header() {
  return (
    <div className="flex gap-x-12 flex-1">
      {navigation.map((item) => (
        <NavButton key={item.name} href={item.href} text={item.name} />
      ))}
    </div>
  );
}
