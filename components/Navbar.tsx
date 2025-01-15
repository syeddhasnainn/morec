"use client";
import { Menu } from "lucide-react";
import { useViewContext } from "./ViewContext";
import { searchTitlesAction } from "@/actions/actions";
import { useItemContext } from "./ItemContext";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 400);
  const { isListView, setIsListView } = useViewContext();
  const { items, setItems } = useItemContext();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Effect to handle debounced search
  useEffect(() => {
    const search = async () => {
      if (value) {
        const result = await searchTitlesAction(value);
        setItems(result);
      }
    };
    search();
  }, [value, setItems]);

  return (
    <nav className="flex justify-between items-center backdrop-blur-sm bg-white/10 p-4 border border-white/10 my-12 max-w-7xl rounded-2xl fixed top-0 left-4 right-4 sm:left-8 sm:right-8 mx-auto z-10 shadow-lg">
      <div className="logo text-2xl font-bold tracking-tighter text-white">
        MOREC
      </div>
      <div
        className="p-2 flex items-center gap-4
        
        "
      >
        <div className="border border-white/30 rounded-xl p-1.5 flex gap-2">
          <button
            onClick={() => setIsListView(true)}
            className={`${
              isListView ? "bg-white text-black" : "text-white"
            } rounded-lg px-2 transition-colors cursor-pointer`}
          >
            LIST
          </button>
          <button
            onClick={() => setIsListView(false)}
            className={`${
              !isListView ? "bg-white text-black" : "text-white"
            } rounded-lg px-2 transition-colors cursor-pointer`}
          >
            GRID
          </button>
        </div>
        <p className="text-white">SEARCH |</p>
        <input
          autoFocus
          onChange={handleSearch}
          placeholder="Enter your query"
          type="text"
          className="bg-transparent border-none outline-none text-white"
        />
      </div>

      <Menu className="cursor-pointer hover:opacity-80 transition-opacity" />
    </nav>
  );
};
