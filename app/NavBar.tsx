"use client";
import Link from "next/link";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { styles } from "./styles/themes";
import { NavLink } from "./types/types";
import { useSession } from "next-auth/react";
import { Box, Flex } from "@radix-ui/themes";

export default function NavBar() {
  const navLinks: NavLink[] = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  return (
    <nav className="h-14 px-6 py-6 border-b-2 mb-5">
      <Flex direction="row" justify="between">
        <Flex gap="2" align="center">
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
        </Flex>
        <Box>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Logout</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
}
