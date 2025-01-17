"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MoView } from "./MoView";
import {
  fetchTvSeries,
  fetchTitlesByGenres,
  fetchNextTitlesPage,
  fetchPreviousTitlesPage,
} from "@/actions/actions";
import { useState } from "react";
import { useItemContext } from "./ItemContext";
import { useRouter } from "next/navigation";

export default function MView({
  result,
  cursor,
}: {
  result: any;
  cursor: any;
}) {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "Game-Show",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk-Show",
    "Thriller",
    "War",
    "Western",
  ];
  const { items, setItems } = useItemContext();

  const router = useRouter();

  // const [CurrentCursor, setCurrentCursor] = useState<string | undefined>(
  //   cursor
  // );
  // console.log("cursor", cursor);

  const handleNextPage = async (cursor: string | undefined) => {
    const { result, nextCursor } = await fetchNextTitlesPage(cursor);
    setItems(result);
    router.push(`/?cursor=${nextCursor}`);
  };

  const handlePreviousPage = async (cursor: string | undefined) => {
    const { result, previousCursor } = await fetchPreviousTitlesPage(cursor);
    setItems(result);
    router.push(`/?cursor=${previousCursor}`);
  };

  const handleCategoryClick = async (genre: string) => {
    const result = await fetchTitlesByGenres(genre);
    setItems(result);
  };
  return (
    <div className="mt-40 md:mt-32">
      <section className="mb-16 px-4">
        <div
          className="flex gap-2 pb-2 overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseDown={(e) => {
            const container = e.currentTarget;
            let isDown = true;
            let startX = e.pageX;
            let scrollLeft = container.scrollLeft;

            const mouseMove = (e: MouseEvent) => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - container.offsetLeft;
              const walk = (x - startX) * 2; // The multiplier controls scroll speed
              container.scrollLeft = scrollLeft - walk;
            };

            const mouseUp = () => {
              isDown = false;
              container.removeEventListener("mousemove", mouseMove);
              container.removeEventListener("mouseup", mouseUp);
            };

            container.addEventListener("mousemove", mouseMove);
            container.addEventListener("mouseup", mouseUp);
          }}
        >
          <style jsx>{`
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {genres.map((genre, index) => (
            <button
              onClick={() => handleCategoryClick(genre)}
              key={index}
              className="text-white/50 border border-white/50 rounded-lg p-2 px-4 whitespace-nowrap hover:bg-white/10 hover:text-white/70 transition-colors cursor-pointer"
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      <section className="image-list px-4 sm:px-0">
        <MoView result={items} />
      </section>

      <section className="flex justify-center my-12 md:mt-12 md:my-0">
        <div className="flex gap-2 backdrop-blur-sm bg-white/10 p-2 border border-white/10 rounded-2xl">
          <button
            onClick={() => handlePreviousPage(cursor)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={() => handleNextPage(cursor)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </section>
    </div>
  );
}
