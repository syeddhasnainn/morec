import MView from "@/components/MView";
import { Navbar } from "@/components/Navbar";
import { ItemProvider } from "@/components/ItemContext";
import { fetchAllTitles, fetchNextTitlesPage } from "@/actions/actions";
export default async function Home({ searchParams }: { searchParams: any }) {

  const cursor = searchParams.cursor
  let result;
  if (cursor) {
    const { result: paginatedResult } = await fetchNextTitlesPage(cursor);
    result = paginatedResult;
  } else {
    result = await fetchAllTitles();
  }

  return (
    <ItemProvider initialItems={result}>
      <div className="bg-black min-h-screen text-white md:p-16 sm:px-12">
        <div className="flex flex-col">
          <Navbar />
          <MView result={result} cursor={cursor} />
        </div>
      </div>
    </ItemProvider>
  );
}
