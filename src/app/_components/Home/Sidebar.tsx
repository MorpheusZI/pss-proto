"use client"
import { nprogress } from "@mantine/nprogress";
import { IconHome2, IconReportAnalytics, IconSettings2 } from "@tabler/icons-react"
import { useRouter } from "next/navigation";
export default function SideBar() {
  const router = useRouter()

  const SettingsHandler = (url?: string) => {
    nprogress.start()
    nprogress.set(40)
    setTimeout(() => {
      nprogress.complete()
    }, 1000);

    if (!url) {
      return router.replace(`/Home`)
    }

    return router.push(`/Home/${url}`)
  }

  return <div className="flex w-1/6 flex-col gap-5 min-h-screen py-5 self-start bg-gradient-to-r from-red-700 text-white">
    <div role="button" tabIndex={0} onClick={() => SettingsHandler()} className="flex items-center justify-self-center gap-[1rem] hover:cursor-pointer rounded-r-2xl px-6 py-3 m-0 hover:text-[#c00] hover:bg-[#282828]">
      <IconHome2 />
      <p>Home</p>
    </div>
    <div role="button" tabIndex={0} onClick={() => SettingsHandler("Analytics")} className="flex items-center justify-self-center gap-[1rem] hover:cursor-pointer rounded-r-2xl px-6 py-3 m-0 hover:text-[#c00] hover:bg-[#282828]">
      <IconReportAnalytics />
      <p>Analytics</p>
    </div>

    <div role="button" tabIndex={0} onClick={() => SettingsHandler("Settings")} className="flex items-center justify-self-center gap-[1rem] hover:cursor-pointer rounded-r-2xl px-6 py-3 m-0 hover:text-[#c00] hover:bg-[#282828]">
      <IconSettings2 />
      <p>User Settings</p>
    </div>
  </div>
}
