import { Container, Group, Stack } from "@mantine/core";
import { IconCircle1, IconNavigationStar } from "@tabler/icons-react";

export default function Main() {
  return <div className="w-full p-4">
    <Stack gap="xl">
      <Group className="border w-full border-black">
        <IconNavigationStar />
        <p>Hello</p>
      </Group>
    </Stack>
  </div>
}
