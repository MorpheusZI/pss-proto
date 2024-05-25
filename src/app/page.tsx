import Link from "next/link";
import { redirect } from "next/navigation";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  return redirect('/Login');
}

