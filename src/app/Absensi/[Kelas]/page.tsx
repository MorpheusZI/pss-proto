"use client";
import { Button, Container, Flex, Stack } from "@mantine/core";
import { useState } from "react";
import QRScanner from "~/app/_components/Utils/QRScanner";
import type { CurrentUser } from "~/types/types";

export default function AbsensiSession({
  params,
}: {
  params: { Kelas: string };
}) {
  const [ResArr, setResArr] = useState<(CurrentUser | undefined)[]>([]);
  return (
    <Flex bg={"dark"} gap={"lg"} className="h-screen text-white">
      <Container w={"50%"}>
        <QRScanner addUser={setResArr} />
        <Button onClick={() => console.log("hahay")}>Scan</Button>
      </Container>
      <Container>
        <Stack>
          <p className="font-bold text-white">Hello {params.Kelas}</p>
          <ul>
            {ResArr.map((User, index) => {
              return (
                <li key={index}>
                  {User?.username}
                  <span className="text-green-500">{User?.status}</span>
                </li>
              );
            })}
          </ul>
        </Stack>
      </Container>
    </Flex>
  );
}
