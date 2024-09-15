"use client";
import {
  Avatar,
  Box,
  DropdownMenu,
  Flex,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { styles } from "./styles/themes";
import { NavLink } from "./types/types";

export default function NavBar() {
  const navLinks: NavLink[] = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  return (
    <nav className="h-14 px-6 py-3 border-b-2 mb-5">
      <Flex direction="row" justify="between" align="center">
        <Flex gap="4" align="center">
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
          {status === "loading" && <Skeleton width="48px" />}
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={
                    session.user && session.user.image ? session.user.image : ""
                  }
                  fallback="?"
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text>{session.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link
              className={`${styles.text.regularText} ${styles.text.hoverText} `}
              href="/api/auth/signin"
            >
              Login
            </Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
}
