import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import React from "react";
import IssueFormLoadingSkeleton from "../../_components/IssueFormLoadingSkeleton";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoadingSkeleton />,
});

type Props = {
  params: { id: string };
};

export default async function EditIssuePage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
