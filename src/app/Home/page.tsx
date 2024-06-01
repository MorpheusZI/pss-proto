"use client"

import { Flex, rem } from "@mantine/core"
import { readSessionStorageValue } from "@mantine/hooks"

import SideBar from "../_components/Home/Sidebar"
import Main from "../_components/Home/Main"

import type { CurrentUser } from "src/types/types"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { notifications } from "@mantine/notifications"
import { IconLockX } from "@tabler/icons-react"

const Home = () => {
  const IconNope = <IconLockX style={{ width: rem(17), height: rem(17) }} />
  const [CurrentUser, setCurrentUser] = useState<CurrentUser>()

  useEffect(() => {
    const CurrentUsr = readSessionStorageValue<CurrentUser>({ key: "CurrentUser" })
    if (!CurrentUsr) {
      notifications.show({
        title: "Anda belum login",
        message: "Mohon login dulu sebelum masuk Home page",
        icon: IconNope,
        bg: "red",
        color: "dark",
        styles: () => ({
          title: { color: "white", fontWeight: "bold" },
          description: { color: "white" }
        })
      })
      return redirect("/Login")
    }
    setCurrentUser(CurrentUsr)
  }, [])


  return <Flex align="center">
    <SideBar />
    <Main CurrentUser={CurrentUser} />
  </Flex>
}

export default Home
