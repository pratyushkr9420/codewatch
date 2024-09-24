import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};

export default function IssuesSummary({ open, closed, inProgress }: Props) {
  const cards: { label: string; value: number; status: Status }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
  ];
  return (
    <Flex gap="4">
      {cards.map((card) => (
        <Card key={card.value}>
          <Flex direction="column">
            <Link
              className="text-lg font-medium"
              href={`/issues/?status=${card.status}`}
            >
              {card.label}
            </Link>
            <Text size="6" className="font-bold">
              {card.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
