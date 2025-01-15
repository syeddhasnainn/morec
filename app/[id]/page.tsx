import { getTitleById } from "@/db/queries/select";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getTitleById(id);
  const movieData = movie[0];

  return (
    <div className="min-h-screen bg-black/95 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>

        {movieData.image && (
          <div className="relative aspect-[2/3] max-w-2xl mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl">
            <Image
              width={500}
              height={500}
              priority={true}
              quality={10}
              src={movieData.image}
              alt={movieData.title || "Movie Poster"}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-8 text-white">
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
