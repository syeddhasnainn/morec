import Image from "next/image";
import { Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { db } from "@/db/db";
import { mntTable } from "@/db/schema";
import { getTvSeries, getAllTitles,  } from "@/db/queries/select";
import MView from "@/components/MView";
import { revalidatePath } from "next/cache";
// import { useState } from "react";
import { Navbar } from "@/components/Navbar";

export default async function Home() {
  const result = await getAllTitles();

  // const [cursor, setCursor] = useState<string | undefined>(undefined);
  // const nextPage = await NextPage();

  // async function fetchNextPage(cursor: string) {
  //   const { data, nextCursor } = await NextPage(cursor);
  //   setCursor(nextCursor);
  //   return data;
  // }

  return (
    <div className="bg-black min-h-screen text-white p-16 sm:px-12">
      <div className="flex flex-col">
        <Navbar />

        <MView result={result} />
      </div>
    </div>
  );
}
