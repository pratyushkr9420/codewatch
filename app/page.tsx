import prisma from "@/prisma/client";
// import IssuesSummary from "./components/IssuesSummary";
// import { LatestIssues } from "./components";
import IssuesCharts from "./components/IssuesCharts";

export default async function Home() {
  const issues = await prisma.issue.findMany();
  const openIssues = issues.filter((issue) => issue.status === "OPEN").length;
  const closedIssues = issues.filter(
    (issue) => issue.status === "CLOSED"
  ).length;
  const inProgressIssues = issues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  ).length;
  return (
    <>
      <IssuesCharts
        open={openIssues}
        closed={closedIssues}
        inProgress={inProgressIssues}
      />
    </>
  );
}
