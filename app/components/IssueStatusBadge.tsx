import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

type Colors = "red" | "green" | "indigo";

const mapStatus: Record<Status, { label: string; color: Colors }> = {
  OPEN: { label: "Open", color: "red" },
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "indigo" },
};

export default function IssueStatusBadge({ status }: { status: Status }) {
  return (
    <Badge color={mapStatus[status].color}>{mapStatus[status].label}</Badge>
  );
}
