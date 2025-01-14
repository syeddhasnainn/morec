import { getTitleById } from "@/db/queries/select";
import Image from "next/image";
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const movie = await getTitleById(id);
  console.log(movie);
  return (
    <div className="min-h-screen">
      <div className="text-white flex flex-col items-center justify-center">
        <div className="rounded-xl overflow-hidden">
          <Image
            src={movie[0].image}
            alt={movie[0].title}
            width={400}
            height={500}
          />
        </div>
        <div>
          <h1>{movie[0].title}</h1>
          <p>{movie[0].description}</p>
          <p>{movie[0].releaseYear}</p>
          <p>{movie[0].rating}</p>
          <p>{movie[0].genres}</p>
          <p>{movie[0].certificate}</p>
        </div>
      </div>
    </div>
  );
}
