import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "./IssueStatusBadge";

export default async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      developer: true,
    },
  });
  return (
    <Card>
      <Heading size="4" mb="2">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex align="start" direction="column" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.developer && (
                    <Avatar
                      size="2"
                      radius="full"
                      src={issue.developer.image!}
                      fallback=" "
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
