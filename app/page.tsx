import prisma from "@/prisma/client";
// import IssuesSummary from "./components/IssuesSummary";
// import { LatestIssues } from "./components";
import IssuesCharts from "./components/IssuesCharts";
import { Flex, Grid } from "@radix-ui/themes";
import IssuesSummary from "./components/IssuesSummary";
import { LatestIssues } from "./components";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <Flex direction="column" gap="6">
        <IssuesSummary
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues}
        />
        <IssuesCharts
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
