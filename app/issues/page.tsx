import prisma from "@/prisma/client";
import { Box, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge, LinkCustom } from "../components";
import IssueTools from "./_components/IssueTools";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
};

const tableColumns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export default async function Issues({ searchParams }: Props) {
  const validStatuses = Object.values(Status);
  const filterStatus = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const revisedOrderBy = tableColumns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: filterStatus,
    },
    orderBy: revisedOrderBy,
  });
  return (
    <Box>
      <IssueTools />
      <Table.Root variant="ghost">
        <Table.Header>
          <Table.Row>
            {tableColumns.map((tableColumn) => (
              <Table.ColumnHeaderCell
                key={tableColumn.value}
                className={tableColumn.className}
              >
                <Link
                  href={{
                    query: { ...searchParams, orderBy: tableColumn.value },
                  }}
                >
                  {tableColumn.label}
                </Link>
                {searchParams.orderBy === tableColumn.value && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <LinkCustom href={`/issues/${issue.id}`} title={issue.title} />
                <div className="md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export const dynamic = "force  dynamic";
