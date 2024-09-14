import { LoadingLine } from "@/app/components";
import { Box } from "@radix-ui/themes";
import React from "react";

export default function IssueFormLoadingSkeleton() {
  return (
    <Box className="space-x-5">
      <LoadingLine />
      <LoadingLine />
    </Box>
  );
}
