import dynamic from "next/dynamic";
import React from "react";
import IssueFormLoadingSkeleton from "../_components/IssueFormLoadingSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoadingSkeleton />,
});

export default function NewIssuePage() {
  return <IssueForm />;
}
