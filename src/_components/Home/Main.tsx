"use client"
import { ActionIcon, Button, Flex, Group, Loader, Stack, Tooltip, } from "@mantine/core";
import { IconCalendarUp, IconClock, IconSearch, IconX, } from "@tabler/icons-react";
import Link from "next/link";
import { jadwal } from "src/Utilities/ProtoStorage/user";
import { ambilHari } from "src/Utilities/utils";
import QRCode from "react-qr-code";
import type { CurrentUser, Jadwal, nama_hari } from "~/types/types";
import type { JadRCProps, MainComponentProps } from "~/types/props";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

export default function Main({ CurrentUser }: MainComponentProps) {
  const HariIni: nama_hari | undefined = ambilHari();
  const TanggalSekarang = dayjs().format("DD/MM/YYYY")

  if (!CurrentUser) {
    return (
      <div className="flex w-full items-center justify-center gap-4">
        <Loader color={"#C00000"} />
      </div>
    );
  }

  return (
    <Stack gap="xl" className="w-full py-5">
      <Group align="start" justify="space-between" className="w-full p-5 rounded-t-3xl bg-gradient-to-b from-[#282828] ">
        <Stack gap="0">
          <h1 className="text-5xl">Hello</h1>
          <p className="text-xl pl-1">{CurrentUser.username}</p>
        </Stack>
        {TanggalSekarang}
      </Group>
      <Flex direction="row">
        <div className="w-1/2">
          {CurrentUser.status === "Guru"
            ? <JadwalRC CurrentUser={CurrentUser} HariIni={HariIni || "Sabtu"} />
            : <QRCodeBoxSC cUser={CurrentUser} />}
        </div>
      </Flex>
    </Stack>
  );
}

function QRCodeBoxSC({ cUser }: { cUser: CurrentUser }) {
  return <div>
    <QRCode value={JSON.stringify(cUser)} />
  </div>
}

function JadwalRC({ CurrentUser, HariIni }: JadRCProps) {
  const [OpenedSearchBar, setOpenedSearchBar] = useState<boolean>(false)
  const [SearchTerm, setSearchTerm] = useState("")

  const Schedules: Jadwal | undefined = jadwal.find(
    (jadw) => jadw.user_ref === CurrentUser?.NIU,
  );
  const JadwalHariIni = Schedules?.Jadwal.find(
    (jad) => jad.hari === HariIni,
  )?.WaktuKelas;

  const renderJadwal = useMemo(() => {
    const filteredJadwal = JadwalHariIni?.filter((jad) => jad.kelas.toLowerCase().includes(SearchTerm.toLowerCase()))

    return filteredJadwal?.map((desc, index) => {
      const KelasString = desc.kelas.split(" ").join("-");

      return (
        <Group
          key={index}
          className="w-full p-3"
          align="center"
          justify="space-between"
        >
          <Group>
            <IconClock />
            <p>{desc.jam}</p>
          </Group>
          <Group gap={"2rem"}>
            <p>{desc.kelas}</p>
            <Button color="#C00" component={Link} href={`/Absensi/${KelasString}`}>
              Absen
            </Button>
          </Group>
        </Group>
      );
    })
  }, [SearchTerm]);


  /*              */
  return <div className="px-3">
    <Stack gap={10} >
      <Group justify="space-between">
        <Group gap={"1em"}>
          <IconCalendarUp />
          <h1 className="text-2xl">{CurrentUser?.status === "Guru" ? "Jadwal Hari ini" : "Tugas"}</h1>
        </Group>
        <Group gap={12}>
          <input
            className={"w-[8rem] text-sm rounded text-black px-2 focus:outline focus:outline-[#C00000] " + (!OpenedSearchBar ? "opacity-0 translate-x-[5rem] " : "opacity-1 ") + "transform transition-all duration-700"}
            value={SearchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={!OpenedSearchBar}
          />
          <Tooltip label="Cari kelas">
            <ActionIcon
              variant="subtle"
              onClick={() => {
                setOpenedSearchBar(!OpenedSearchBar)
                setSearchTerm("")
              }}
              color="white" className=" hover:bg-white hover:text-black" >
              {!OpenedSearchBar ? <IconSearch /> : <IconX />}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <Stack gap={0} className="px-3 py-2 bg-gradient-to-b from-[#282828] to-[#181818] border-2 rounded-xl border-red-700">   {renderJadwal}
      </Stack>
    </Stack>
  </div>

}
