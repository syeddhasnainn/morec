import MView from "@/components/MView";
import { Navbar } from "@/components/Navbar";
import { getAllTitles } from "@/db/queries/select";
import { ItemProvider } from "@/components/ItemContext";
export default async function Home() {
  const result = await getAllTitles();

  return (
    <ItemProvider initialItems={result}>
      <div className="bg-black min-h-screen text-white p-16 sm:px-12">
        <div className="flex flex-col">
          <Navbar />
          <MView result={result} />
        </div>
      </div>
    </ItemProvider>
  );
}
