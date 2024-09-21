"use client";
import { LoadingLine } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function SelectUsers({ issue }: { issue: Issue }) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get<User[]>("/api/users");
      return data;
    },
    staleTime: 1000 * 60,
    retry: 4,
  });

  const assignUsers = (userId: string) => {
    axios.patch(`/api/issues/${issue.id}`, {
      developerId: userId !== "none" ? userId : null,
    });
  };

  if (isLoading) return LoadingLine;

  if (error) return <p>{error.message}</p>;
  return (
    <Select.Root
      defaultValue={issue.developerId || ""}
      onValueChange={assignUsers}
    >
      <Select.Trigger placeholder="Assign user" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          <Select.Item value={"none"}>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
