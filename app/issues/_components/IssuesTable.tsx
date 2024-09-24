import { IssueStatusBadge, LinkCustom } from "@/app/components";
import { IssuesQuery } from "@/app/types/types";
import { Issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  searchParams: IssuesQuery;
  issues: Issue[];
};

export default function IssuesTable({ searchParams, issues }: Props) {
  return (
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
  );
}

const tableColumns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const tableColumnNames = tableColumns.map((column) => column.value);
