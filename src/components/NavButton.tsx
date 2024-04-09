"use client";
import "./NavButton.css";
import { usePathname } from "next/navigation";
export default function NavButton({
  text,
  href,
}: Readonly<{ text: string; href: string }>) {
  const currentRoute = usePathname().substr(1);
  return (
    <>
      <a
        className={
          currentRoute === href || (currentRoute === "" && text == "Home")
            ? "button active"
            : "button"
        }
        href={href}
      >
        <span className="actual-text">&nbsp;{text}&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;{text}&nbsp;
        </span>
      </a>
    </>
  );
}
