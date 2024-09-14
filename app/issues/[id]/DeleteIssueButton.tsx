"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Spinner } from "@/app/components";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteIssue = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
      setIsDeleting(false);
    } catch (err) {
      setError(true);
      setIsDeleting(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger disabled={isDeleting}>
          <Button size="4" color="red">
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm delete</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action is permanent
          </AlertDialog.Description>
          <Flex gap="3" mt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error on issue deletion</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button onClick={() => setError(false)} mt="4">
            Close
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
