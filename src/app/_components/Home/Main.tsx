import { Group, Stack } from "@mantine/core";
import { IconClock, IconNavigationStar } from "@tabler/icons-react";
import { jadwal } from "Utilities/ProtoStorage/user";
import { ambilHari } from "Utilities/utils";
import type { Jadwal, MainComponentProps, nama_hari } from '~/types/types';

export default function Main({ CurrentUser }: MainComponentProps) {

  const HariIni: nama_hari | undefined = ambilHari()

  const Schedules: Jadwal | undefined = jadwal.find((jadw) => jadw.user_ref === CurrentUser.NIU)
  const JadwalHariIni = Schedules?.Jadwal.find((jad) => jad.hari === HariIni)?.WaktuKelas

  const renderJadwal = JadwalHariIni?.map((desc, index) => {
    return <Group key={index} className="w-full p-3 border-2 border-black" justify={"space-around"} >
      <Group>
        <IconClock />
        <p>{desc.jam}</p>
      </Group>
      <p>{desc.kelas}</p>
    </Group>
  })

  return <div className="w-full p-4">
    <Stack gap="xl">
      <Group className="border text-black w-full border-black">
        <IconNavigationStar />
        <p>Hello {CurrentUser.status} {CurrentUser?.username} {HariIni}</p>
      </Group>
      <Stack>
        {CurrentUser.status === "Guru" ? renderJadwal : "Tugas anda Belum ada"}
      </Stack>
    </Stack>
  </div>
}
