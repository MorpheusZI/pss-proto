"use client";
import { Container, Flex, Stack } from "@mantine/core";
import { Result } from "@zxing/library";
import { useState } from "react";
import { Scanner } from "~/_components/Utils/QRZxing";
import type { CurrentUser } from "~/types/types";

export default function AbsensiSession({
  params,
}: {
  params: { Kelas: string };
}) {
  const [ResArr, setResArr] = useState<(CurrentUser | undefined)[]>([]);

  const handleUpdate = (e: unknown, data: Result | undefined) => {
    if (data) {
      const UserData: CurrentUser = JSON.parse(data.getText());
      setResArr((prevSex) => [...prevSex, UserData]);
    }
    if (e) {
      console.error("et rusak cog", e);
    }
  };

  return (
    <Flex bg={"dark"} gap={"lg"} className="h-screen text-white">
      <Scanner width="500px" onUpdate={handleUpdate} />
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
