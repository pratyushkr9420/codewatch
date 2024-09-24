import { Issue, Status } from "@prisma/client";

export type IssueForm = {
  title: string;
  description: string;
};

export type NavLink = {
  name: string;
  href: string;
};

export type IssuesQuery = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};
