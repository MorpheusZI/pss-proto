'use client'
import { Flex } from "@mantine/core";

export default function AbsensiSession({ params }: { params: { Kelas: string } }) {
  return <Flex bg={"dark"} className="text-white h-screen">
    <p>Hello {params.Kelas}</p>
  </Flex >
}
