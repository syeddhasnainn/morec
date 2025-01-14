"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useViewContext } from "./ViewContext";

export const MoView = ({ result }: { result: any }) => {
  const { isListView } = useViewContext();

  return (
    <div>
      {!isListView ? (
        <section className="image-grid px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {result.map((row: any, index: any) => (
              <Link href={`/${row.id}`} key={row.id} prefetch={true}>
                <div
                  key={row.id}
                  className="rounded-lg overflow-hidden group cursor-pointer "
                >
                  <Image
                    src={row.image}
                    alt={row.title}
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover hover:scale-110 transition-all duration-500 mb-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section>
          {result.map((row: any, index: any) => (
            <div
              key={row.id}
              className="flex flex-col sm:flex-row border-b border-white/50 py-4 sm:py-8 gap-4 sm:gap-0"
            >
              <div className="w-full sm:w-1/2">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={row.image}
                      alt={row.title}
                      width={80}
                      height={100}
                      className="w-full h-auto object-center"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-500 text-sm">Title</div>
                    <div className="text-base sm:text-lg">{row.title}</div>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-0">
                  <div>
                    <div className="text-gray-500 text-sm">Rating</div>
                    <div className="text-base sm:text-lg">{row.rating}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Release Year</div>
                    <div className="text-base sm:text-lg">
                      {row.releaseYear}
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-gray-500 text-sm">Genre</div>
                    <div className="text-base sm:text-lg">{row.genres}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
