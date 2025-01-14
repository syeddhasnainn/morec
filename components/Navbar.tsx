"use client";
import { Menu } from "lucide-react";
import { useViewContext } from "./ViewContext";

export const Navbar = () => {
  const { isListView, setIsListView } = useViewContext();

  return (
    <nav className="flex justify-between items-center backdrop-blur-sm bg-white/10 p-4 border border-white/10 my-12 max-w-7xl rounded-2xl fixed top-0 left-4 right-4 sm:left-8 sm:right-8 mx-auto z-10 shadow-lg">
      <div className="logo text-2xl font-bold tracking-tighter">MOREC</div>
      <div className="border border-white/30 rounded-xl p-1.5 flex gap-2">
        <button
          onClick={() => setIsListView(true)}
          className={`${
            isListView ? "bg-white text-black" : "text-white"
          } rounded-lg px-2 hover:bg-white/90 transition-colors cursor-pointer`}
        >
          LIST
        </button>
        <button
          onClick={() => setIsListView(false)}
          className={`${
            !isListView ? "bg-white text-black" : "text-white"
          } rounded-lg px-2 hover:bg-white/90 transition-colors cursor-pointer`}
        >
          GRID
        </button>
      </div>
      <Menu className="cursor-pointer hover:opacity-80 transition-opacity" />
    </nav>
  );
};
