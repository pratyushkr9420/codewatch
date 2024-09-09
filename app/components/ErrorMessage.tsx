import { Text } from "@radix-ui/themes";
import React from "react";

type ErrorMessage = {
  message: string | undefined;
};

export default function ErrorMessage({ message }: ErrorMessage) {
  if (!message) return null;
  return (
    <Text color="red" as="p">
      {message}
    </Text>
  );
}
