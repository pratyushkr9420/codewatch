"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};

export default function IssuesCharts({ open, closed, inProgress }: Props) {
  const data = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "In Progress", value: inProgress },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-10)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
