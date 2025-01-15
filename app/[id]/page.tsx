import { getTitleById } from "@/db/queries/select";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {use} from "react"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const {id} = use(params)
  const movie = await getTitleById(id);
  const movieData = movie[0];

  return (
    <div className="min-h-screen bg-black/95 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>

        {/* Title and Metadata - Now at the top */}

        {/* Centered Image */}
        {movieData.image && (
          <div className="relative aspect-[2/3] max-w-2xl mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl">
            <Image
              priority={true}
              quality={50}
              src={movieData.image}
              alt={movieData.title || "Movie Poster"}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content Section - Below Image */}
        <div className="max-w-3xl mx-auto space-y-8 text-white">
          {/* Metadata Bar */}
          <div className="mt-8 border-b border-white/40 pb-6">
            <div className="flex items-center justify-between text-white">
              <div className=" font-medium">{movieData.title}</div>
              <div className="flex items-center gap-8">
                {movieData.duration && (
                  <div className="font-medium">{movieData.duration}</div>
                )}
                {movieData.releaseYear && (
                  <div className="font-medium">{movieData.releaseYear}</div>
                )}
                {movieData.rating && (
                  <div className="font-medium">{movieData.rating}</div>
                )}
                {movieData.certificate && (
                  <div className="font-medium">{movieData.certificate}</div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {movieData.description && (
            <div className="space-y-2 text-center">
              <p className="font-medium text-white leading-relaxed">
                {movieData.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
