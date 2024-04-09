import NavButton from "@/components/NavButton";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "blog" },
  { name: "About", href: "about" },
  { name: "Resume", href: "resume" },
];

export default function Header() {
  return (
    <div className="flex gap-x-12">
      {navigation.map((item) => (
        <NavButton key={item.name} href={item.href} text={item.name} />
      ))}
    </div>
  );
}
