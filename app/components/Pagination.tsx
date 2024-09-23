"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  };
  if (totalPages <= 1) return;
  return (
    <Flex align="center" gap="2">
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ArrowLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ArrowRightIcon />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}
