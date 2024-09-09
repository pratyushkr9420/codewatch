"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/issues", data);
      setIsSubmitting(false);
      router.push("/issues");
    } catch (error) {
      setErrorMessage("unexpected error occured");
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-2xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage message={errors.title?.message} />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage message={errors.description?.message} />
        <Button disabled={isSubmitting}>
          Submit Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
