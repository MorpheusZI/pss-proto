"use client"
import { ActionIcon, Button, Group, Loader, Stack, Tooltip } from "@mantine/core";
import { IconCalendarUp, IconClock, IconSearch, } from "@tabler/icons-react";
import Link from "next/link";
import { jadwal } from "src/Utilities/ProtoStorage/user";
import { ambilHari } from "src/Utilities/utils";
import QRCode from "react-qr-code";
import type { Jadwal, nama_hari } from "~/types/types";
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
    <Stack gap="xl" className="w-full h-screen py-5">
      <Group align="start" justify="space-between" className="w-full border-t border-t-[#C00000] border-x border-x-[#C00000] p-5 rounded-t-3xl bg-gradient-to-b from-[#282828] ">
        <Stack gap="0">
          <h1 className="text-5xl">Hello</h1>
          <p className="text-xl pl-1">{CurrentUser.username}</p>
        </Stack>
        <div>
          {CurrentUser.status === "Siswa" ? (
            <QRCode value={JSON.stringify(CurrentUser)} />
          ) : (
            <p className="flex font-bold gap-2 items-center">
              {HariIni}, {TanggalSekarang}
            </p>
          )}
        </div>
      </Group>

      <JadwalRC CurrentUser={CurrentUser} HariIni={HariIni || "Senin"} />

    </Stack>
  );
}

function JadwalRC({ CurrentUser, HariIni }: JadRCProps) {
  const [SearchTerm, setSearchTerm] = useState("")

  const Schedules: Jadwal | undefined = jadwal.find(
    (jadw) => jadw.user_ref === CurrentUser?.NIU,
  );
  const JadwalHariIni = Schedules?.Jadwal.find(
    (jad) => jad.hari === HariIni,
  )?.WaktuKelas;

  const renderJadwal = useMemo(() => {
    return JadwalHariIni?.map((desc, index) => {
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


  return <Group justify="space-between" className="w-full">
    <div className="w-1/2 px-3">
      <Stack gap={10} >
        <Group justify="space-between">
          <Group gap={"1em"}>
            <IconCalendarUp />
            <h1 className="text-2xl">{CurrentUser?.status === "Guru" ? "Jadwal Hari ini" : "Tugas"}</h1>
          </Group>
          <Tooltip label="Cari kelas">
            <ActionIcon variant="subtle" color="white" className="mr-3 hover:bg-white hover:text-black" >
              <IconSearch />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Stack gap={0} className="px-3 py-2 bg-gradient-to-b from-[#282828] to-[#181818] border-2 rounded-xl border-red-700">
          {CurrentUser?.status === "Guru" ? (
            renderJadwal
          ) : (
            <p>Gaada Tugas</p>
          )}
        </Stack>
      </Stack>
    </div>
  </Group>
}
