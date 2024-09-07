"use client";
import Link from "next/link";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { styles } from "./styles/themes";
import { NavLink } from "./types/types";

export default function NavBar() {
  const navLinks: NavLink[] = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  // `text-gray-400 hover:text-gray-700 text-xl`
  return (
    <nav className="flex space-x-8 h-10 items-center px-6 py-6 border-b-2 mb-5">
      <Link href="/">
        <MdDashboard size={25} />
      </Link>
      <ul className="flex space-x-8">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={classNames({
              [styles.text.regularText]: true,
              [styles.text.hoverText]: true,
              [styles.text.activeText]: link.href === currentPath,
            })}
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
