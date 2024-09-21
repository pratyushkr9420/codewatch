"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const IssueStatuses: { label: string; value: Status | " " }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
  { label: "All", value: " " },
];
export default function IssueStatusFilter() {
  return (
    <Select.Root defaultValue="">
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          {IssueStatuses.map(({ label, value }) => (
            <Select.Item key={value} value={value}>
              {label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
