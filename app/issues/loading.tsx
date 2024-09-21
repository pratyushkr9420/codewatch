import { Table } from "@radix-ui/themes";
import React from "react";
import { LoadingLine } from "../components";
import IssueTools from "./_components/IssueTools";

export default function LoadingIssuesPage() {
  const issues = [1, 1, 1, 1, 1];

  return (
    <div>
      <IssueTools />
      <Table.Root variant="ghost">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <LoadingLine />
                <div className="md:hidden">
                  <LoadingLine />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <LoadingLine />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <LoadingLine />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
