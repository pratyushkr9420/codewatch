import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { cache } from "react";
import { SelectUsers } from "./SelectUsers";

type Props = {
  params: {
    id: string;
  };
};

const fetchIssue = cache(
  async (issueId: number) =>
    await prisma.issue.findUnique({ where: { id: issueId } })
);

export default async function IssueDetailPage({ params: { id } }: Props) {
  const issue = await fetchIssue(parseInt(id));
  const session = await getServerSession(authOptions);

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="4">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <SelectUsers issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(parseInt(id));
  if (!issue) return;
  return {
    title: `${issue.title}`,
    description: `Details of the issue ${issue.id}`,
  };
}
