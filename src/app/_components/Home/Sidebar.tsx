import { ActionIcon, Avatar, Group, Stack } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react"
import type { SidebarComponentProps } from "~/types/props";
export default function SideBar({ CurrentUser }: SidebarComponentProps) {
  return <Stack className="w-1/4 h-screen px-3 bg-gradient-to-r from-red-700 text-white">
    <Group p={"xs"} justify="space-between" className="border-b-2 border-red-300">
      <Group justify="center" >
        <Avatar />
        <Stack>
          <p className="font-bold">{CurrentUser?.username}</p>
        </Stack>
      </Group>
      <ActionIcon variant="transparent" className="text-white">
        <IconSettings />
      </ActionIcon>
    </Group>
  </Stack>
}
