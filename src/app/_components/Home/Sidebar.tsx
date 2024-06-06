"use client"
import { Group, Stack } from "@mantine/core";
import { nprogress } from "@mantine/nprogress";
import { IconHome, IconReportAnalytics, IconSettings2 } from "@tabler/icons-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SidebarComponentProps } from "~/types/props";
export default function SideBar({ CurrentUser }: SidebarComponentProps) {
  const router = useRouter()
  const [SettingsClicked, setSettingsClicked] = useState(false)

  const SettingsHandler = (url: string) => {
    setSettingsClicked(prevs => !prevs)
    nprogress.start()
    if (SettingsClicked) {
      nprogress.set(70)
      setTimeout(() => {
        nprogress.complete()
      }, 1000);
      return router.push("/Home")
    }

    nprogress.set(40)
    setTimeout(() => {
      nprogress.complete()
    }, 1000);
    return router.push(`/Home/${url}`)
  }
  //
  return <Stack className="w-1/6 min-h-screen py-5 self-start bg-gradient-to-r from-red-700 text-white">
    <Group align="center" role="button" tabIndex={0} onClick={() => SettingsHandler("Settings")} className="text-white hover:cursor-pointer rounded-r-2xl px-6 py-3 m-0 hover:text-[#c00] hover:bg-[#282828]" gap={"1rem"}>
      {SettingsClicked ? <IconHome /> : <IconSettings2 />}
      {SettingsClicked ? <p>Home</p> : <p>User settings</p>}
    </Group>
    <Group align="center" role="button" onKeyDown={(event) => {
      if (event.key === "Enter") {
        event.preventDefault()
        console.log("waho")
      }
    }} tabIndex={0} onClick={() => SettingsHandler("Analytics")} className="text-white hover:cursor-pointer rounded-r-2xl px-6 py-3 m-0 hover:text-[#c00] hover:bg-[#282828]" gap={"1rem"}>
      <IconReportAnalytics />
      <p>Analytics</p>
    </Group>
  </Stack>
}
