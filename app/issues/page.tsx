import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function Issues() {
  return (
    <div>
      <Button variant="solid">
        <Link href="/issues/new">Add a new Issue</Link>
      </Button>
    </div>
  );
}
