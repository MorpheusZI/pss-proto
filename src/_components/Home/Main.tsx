"use client";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Loader,
  Stack,
  Tooltip,
} from "@mantine/core";
import {
  IconCalendarUp,
  IconClock,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { toPng } from "html-to-image";
import { jadwal } from "src/Utilities/ProtoStorage/user";
import { ambilHari } from "src/Utilities/utils";
import QRCode from "qrcode.react";
import type { CurrentUser, Jadwal, nama_hari } from "~/types/types";
import type { JadRCProps, MainComponentProps } from "~/types/props";
import dayjs from "dayjs";
import { useMemo, useRef, useState } from "react";

export default function Main({ CurrentUser }: MainComponentProps) {
  const HariIni: nama_hari | undefined = ambilHari();
  const TanggalSekarang = dayjs().format("DD/MM/YYYY");

  if (!CurrentUser) {
    return (
      <div className="flex w-full items-center justify-center gap-4">
        <Loader color={"#C00000"} />
      </div>
    );
  }

  return (
    <Stack gap="xl" className="w-full py-5">
      <Group
        align="start"
        justify="space-between"
        className="w-full rounded-t-3xl bg-gradient-to-b from-[#282828] p-5 "
      >
        <Stack gap="0">
          <h1 className="text-5xl">Hello</h1>
          <p className="pl-1 text-xl">{CurrentUser.username}</p>
        </Stack>
        {TanggalSekarang}
      </Group>
      <Flex direction="row">
        <div className="w-1/2">
          {CurrentUser.status === "Guru" ? (
            <JadwalRC CurrentUser={CurrentUser} HariIni={HariIni || "Sabtu"} />
          ) : (
            <QRCodeBoxSC cUser={CurrentUser} />
          )}
        </div>
      </Flex>
    </Stack>
  );
}

function QRCodeBoxSC({ cUser }: { cUser: CurrentUser }) {
  const namaSiswa = cUser.username.split(" ").join("_").toUpperCase();
  const qrref = useRef(null);

  const downloadQRCode = () => {
    if (qrref === null) {
      return;
    }
    console.log(qrref);
    console.log("Hello bro");
    //@ts-ignore
    toPng(qrref.current).then((dataURL) => {
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `Kode-QR-Absensi_${namaSiswa}.png`;
      link.click();
    });
  };

  return (
    <Stack justify="center" align="center">
      <QRCode className="w-full" value={JSON.stringify(cUser)} ref={qrref} />
      <Button color="#C00000" onClick={downloadQRCode} className="w-fit">
        Download Kode QR
      </Button>
    </Stack>
  );
}

function JadwalRC({ CurrentUser, HariIni }: JadRCProps) {
  const [OpenedSearchBar, setOpenedSearchBar] = useState<boolean>(false);
  const [SearchTerm, setSearchTerm] = useState("");

  const Schedules: Jadwal | undefined = jadwal.find(
    (jadw) => jadw.user_ref === CurrentUser?.NIU,
  );
  const JadwalHariIni = Schedules?.Jadwal.find(
    (jad) => jad.hari === HariIni,
  )?.WaktuKelas;

  const renderJadwal = useMemo(() => {
    const filteredJadwal = JadwalHariIni?.filter((jad) =>
      jad.kelas.toLowerCase().includes(SearchTerm.toLowerCase()),
    );

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
            <Button
              color="#C00"
              component={Link}
              href={`/Absensi/${KelasString}`}
            >
              Absen
            </Button>
          </Group>
        </Group>
      );
    });
  }, [SearchTerm]);

  /*              */
  return (
    <div className="px-3">
      <Stack gap={10}>
        <Group justify="space-between">
          <Group gap={"1em"}>
            <IconCalendarUp />
            <h1 className="text-2xl">
              {CurrentUser?.status === "Guru" ? "Jadwal Hari ini" : "Tugas"}
            </h1>
          </Group>
          <Group gap={12}>
            <input
              className={
                "w-[8rem] rounded px-2 text-sm text-black focus:outline focus:outline-[#C00000] " +
                (!OpenedSearchBar
                  ? "translate-x-[5rem] opacity-0 "
                  : "opacity-1 ") +
                "transform transition-all duration-700"
              }
              value={SearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!OpenedSearchBar}
            />
            <Tooltip label="Cari kelas">
              <ActionIcon
                variant="subtle"
                onClick={() => {
                  setOpenedSearchBar(!OpenedSearchBar);
                  setSearchTerm("");
                }}
                color="white"
                className=" hover:bg-white hover:text-black"
              >
                {!OpenedSearchBar ? <IconSearch /> : <IconX />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Stack
          gap={0}
          className="rounded-xl border-2 border-red-700 bg-gradient-to-b from-[#282828] to-[#181818] px-3 py-2"
        >
          {" "}
          {renderJadwal}
        </Stack>
      </Stack>
    </div>
  );
}
