import { Button, Container, Group, Loader, Stack } from "@mantine/core";
import { IconClock, IconNavigationStar } from "@tabler/icons-react";
import Link from "next/link";
import { jadwal } from "src/Utilities/ProtoStorage/user";
import { ambilHari } from "src/Utilities/utils";
import QRCode from "react-qr-code";
import type { Jadwal, MainComponentProps, nama_hari } from "~/types/types";

export default function Main({ CurrentUser }: MainComponentProps) {
  const HariIni: nama_hari | undefined = ambilHari();

  const Schedules: Jadwal | undefined = jadwal.find(
    (jadw) => jadw.user_ref === CurrentUser?.NIU,
  );
  const JadwalHariIni = Schedules?.Jadwal.find(
    (jad) => jad.hari === HariIni,
  )?.WaktuKelas;

  const renderJadwal = JadwalHariIni?.map((desc, index) => {
    const KelasString = desc.kelas.split(" ").join("-");
    return (
      <Group
        key={index}
        className="w-full border-2 border-black p-3"
        justify={"space-around"}
      >
        <Group>
          <IconClock />
          <p>{desc.jam}</p>
        </Group>
        <Group>
          <p>{desc.kelas}</p>
          <Button component={Link} href={`/Absensi/${KelasString}`}>
            Absen
          </Button>
        </Group>
      </Group>
    );
  });

  if (!CurrentUser) {
    return (
      <div className="flex w-full items-center justify-center gap-4">
        <p className="text-4xl font-bold text-blue-500">Loading User Data</p>
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <Stack gap="xl">
        <Group className="w-full border border-black text-black">
          <IconNavigationStar />
          <p>
            Hello {CurrentUser?.status} {CurrentUser?.username} {HariIni}
          </p>
          <Container>
            {CurrentUser.status === "Siswa" ? (
              <QRCode value={JSON.stringify(CurrentUser)} />
            ) : (
              <p>Ahay</p>
            )}
          </Container>
        </Group>
        <Stack>
          {CurrentUser?.status === "Guru" ? (
            renderJadwal
          ) : (
            <p>Tugas anda Belum ada</p>
          )}
        </Stack>
      </Stack>
    </div>
  );
}
