"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IssueForm } from "@/app/types/types";
import { useRouter } from "next/navigation";

export default function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Success:");
      router.push("/issues");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form className="max-w-2xl space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button>Submit Issue</Button>
    </form>
  );
}
