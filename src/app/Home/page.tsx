import { Group } from "@mantine/core";
import Sidebar from "../_components/Home/Sidebar";
import Main from "../_components/Home/Main";

export default function Home() {
  return <Group>
    <Sidebar />
    <Main />
  </Group>
}
