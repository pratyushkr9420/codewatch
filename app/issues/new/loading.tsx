import { LoadingLine } from "@/app/components";
import { Box } from "@radix-ui/themes";

export default function LoadingNewIssuePage() {
  return (
    <Box className="space-x-5">
      <LoadingLine />
      <LoadingLine />
    </Box>
  );
}
