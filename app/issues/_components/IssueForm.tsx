import dynamic from "next/dynamic";
import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      setIsSubmitting(false);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setErrorMessage("unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {errorMessage && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage message={errors.title?.message} />
        <Controller
          control={control}
          defaultValue={issue?.description}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage message={errors.description?.message} />
        <Button disabled={isSubmitting}>
          {issue ? "Edit Issue" : "Submit Issue"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
