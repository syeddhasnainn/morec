"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MoView } from "./MoView";
import { fetchTvSeries, fetchTitlesByGenres, fetchNextTitlesPage, fetchPreviousTitlesPage } from "@/actions/actions";
import { useState } from "react";

export default function MView({ result }: { result: any }) {
  const genres = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", 
    "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "Game-Show", 
    "History", "Horror", "Music", "Musical", "Mystery", "News", "Reality-TV", 
    "Romance", "Sci-Fi", "Short", "Sport", "Talk-Show", "Thriller", "War", 
    "Western"
  ];
  const [items, setItems] = useState(result);
  const handleClick = async () => {

    const result = await fetchTvSeries();
    setItems(result);
  };

  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const handleNextPage = async (cursor: string | undefined) => {
    const { result, nextCursor } = await fetchNextTitlesPage(cursor);
    setItems(result);
    setCursor(nextCursor);
  };

  const handlePreviousPage = async (cursor: string | undefined) => {
    const { result, previousCursor } = await fetchPreviousTitlesPage(cursor);
    setItems(result);
    setCursor(previousCursor);
  };

  const handleCategoryClick = async (genre: string) => {
    const result = await fetchTitlesByGenres(genre);
    setItems(result);
  };
  return (
    <div className="mt-32">
      <section className="mb-16 px-4">
        <div 
          className="flex gap-2 pb-2 overflow-x-auto"
          style={{
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
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
              container.removeEventListener('mousemove', mouseMove);
              container.removeEventListener('mouseup', mouseUp);
            };

            container.addEventListener('mousemove', mouseMove);
            container.addEventListener('mouseup', mouseUp);
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
          <button
            onClick={handleClick}
            className="text-white/50 border border-white/50 rounded-lg p-2 px-4 whitespace-nowrap hover:bg-white/10 hover:text-white/70 transition-colors cursor-pointer"
          >
            TV Series
          </button>
        </div>
      </section>

      <section className="image-list px-4">
        <MoView result={items} />
      </section>

      <section className="flex justify-center mt-12">
        <div className="flex gap-2">
          <button
            onClick={() => handlePreviousPage(cursor)}
            className="bg-white rounded-lg p-2"
          >
            <ChevronLeft color="black" />
          </button>
          <button
            onClick={() => handleNextPage(cursor)}
            className="bg-white rounded-lg p-2"
          >
            <ChevronRight color="black" />
          </button>
        </div>
      </section>
    </div>
  );
}
