import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import { IssuesQuery } from "../types/types";
import IssuesTable, { tableColumnNames } from "./_components/IssuesTable";
import IssueTools from "./_components/IssueTools";

type Props = {
  searchParams: IssuesQuery;
};

export default async function Issues({ searchParams }: Props) {
  const validStatuses = Object.values(Status);
  const filterStatus = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const revisedOrderBy = tableColumnNames.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const itemsPerPage = 10;

  const totalIssues = await prisma.issue.count({
    where: {
      status: filterStatus,
    },
  });

  const issues = await prisma.issue.findMany({
    where: {
      status: filterStatus,
    },
    orderBy: revisedOrderBy,
    skip: (page - 1) * 10,
    take: itemsPerPage,
  });
  return (
    <Flex direction="column" gap="4">
      <IssueTools />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        itemsPerPage={itemsPerPage}
        totalItems={totalIssues}
      />
    </Flex>
  );
}

export const dynamic = "force  dynamic";
