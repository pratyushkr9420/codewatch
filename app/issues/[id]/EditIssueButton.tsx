import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button size="4">
      <Link href={`/issues/edit/${issueId}`}>
        <Pencil2Icon />
      </Link>
      <Link href={`/issues/edit/${issueId}`}>Edit</Link>
    </Button>
  );
}
