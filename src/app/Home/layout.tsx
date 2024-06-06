"use client"
import { Box, Container, Flex, Loader, rem } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SideBar from "../_components/Home/Sidebar";
import { IconLockX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { redirect } from "next/navigation";
import { readSessionStorageValue } from "@mantine/hooks";
import type { CurrentUser } from "~/types/types";

export default function HomeLayout({ children }: { children: React.ReactNode }) {

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

  return <Flex gap="md" bg="black" className="w-full min-h-screen text-white">
    <SideBar CurrentUser={CurrentUser} />
    {!CurrentUser ? <Container className=" flex align-center justify-center" >
      <Loader color={"#C00000"} className="self-center" />
    </Container>
      : <Container p={0} w={"100%"}>
        {children}
      </Container>
    }
  </Flex>
}
