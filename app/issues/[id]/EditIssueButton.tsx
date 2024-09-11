import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}>Edit</Link>
    </Button>
  );
}
