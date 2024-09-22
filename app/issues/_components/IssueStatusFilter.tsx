"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueStatuses: { label: string; value: Status | " " }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
  { label: "All", value: " " },
];
export default function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleStatusChange = (status: Status | " ") => {
    const params = new URLSearchParams();

    if (status) {
      params.set("status", status);
    }

    if (params.get("orderBy")) {
      params.append("orderBy", params.get("orderBy")!);
    }

    const query = params.size > 0 ? `?${params.toString()}` : "";
    router.push(`/issues` + query);
  };
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || " "}
      onValueChange={handleStatusChange}
    >
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
