"use client";
import { fetchAllTitles } from "@/actions/actions";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
interface ItemContextType {
  items: any;
  setItems: (items: any) => void;
}
const ItemContext = createContext<ItemContextType | null>(null);

export const ItemProvider = ({
  children,
  initialItems,
}: {
  children: React.ReactNode;
  initialItems: any;
}) => {
  const [items, setItems] = useState(initialItems);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
