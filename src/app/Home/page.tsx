"use client"
import { Flex } from "@mantine/core";
import Sidebar from "../_components/Home/Sidebar";
import Main from "../_components/Home/Main";
import { readSessionStorageValue } from "@mantine/hooks";
import { CurrentUser } from "~/types/types";

export default function Home() {
  const CurrentUser = readSessionStorageValue<CurrentUser>({ key: "CurrentUser" })

  return <Flex>
    <Sidebar />
    <Main CurrentUser={CurrentUser} />
  </Flex>
}
