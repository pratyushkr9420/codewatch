import NextLink from "next/link";
import { Link } from "@radix-ui/themes";
import React from "react";

type Props = {
  href: string;
  title: string;
};

export default function LinkCustom({ href, title }: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Link>{title}</Link>
    </NextLink>
  );
}
