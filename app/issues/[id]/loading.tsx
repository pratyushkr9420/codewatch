import { LoadingLine } from "@/app/components";
import { Flex, Card, Box } from "@radix-ui/themes";
import React from "react";

export default function LoadingIssueDetailPage() {
  return (
    <Box>
      <LoadingLine />
      <Flex gap="3" my={"2"}>
        <LoadingLine />
        <LoadingLine />
      </Flex>
      <Card className="prose space-y-5" mt="4">
        <LoadingLine />
        <LoadingLine />
        <LoadingLine />
      </Card>
    </Box>
  );
}
