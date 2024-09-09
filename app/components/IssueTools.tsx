import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function IssueTools() {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">Add a Issue</Link>
      </Button>
    </div>
  );
}
