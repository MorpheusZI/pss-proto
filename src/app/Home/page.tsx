"use client"
import { Flex, rem } from "@mantine/core";
import Sidebar from "../_components/Home/Sidebar";
import Main from "../_components/Home/Main";
import { readSessionStorageValue } from "@mantine/hooks";
import { CurrentUser } from "~/types/types";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { IconLockX } from "@tabler/icons-react"

export default function Home() {
  const router = useRouter()
  const CurrentUser = readSessionStorageValue<CurrentUser>({ key: "CurrentUser" })
  const IconNope = <IconLockX style={{ width: rem(18), height: rem(18) }} />
  if (!CurrentUser) {
    notifications.show({
      title: "Anda belum login!",
      message: "Mohon login terlebih dahulu",
      icon: IconNope,
      color: "red",
      bg: "dark",
      styles: () => ({
        title: { color: "white", fontWeight: "bold" },
        description: { color: "white" }
      })
    })
    return router.push("/Login")
  }

  return <Flex>
    <Sidebar />
    <Main CurrentUser={CurrentUser} />
  </Flex>
}
