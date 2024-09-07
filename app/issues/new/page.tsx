"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";

export default function NewIssuePage() {
  return (
    <div className="max-w-2xl space-y-4">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE />
      <Button>Submit Issue</Button>
    </div>
  );
}
