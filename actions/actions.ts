"use server";

import {
  getTvSeries,
  getTitlesByGenres,
  NextTitlesPage,
  PreviousTitlesPage,
} from "@/db/queries/select";

export async function fetchTvSeries() {
  const result = await getTvSeries();
  return result;
}

export async function fetchTitlesByGenres(genres: string) {
  const result = await getTitlesByGenres(genres);
  return result;
}

export async function fetchNextTitlesPage(cursor?: string) {
  const { result, nextCursor } = await NextTitlesPage(cursor);
  return {
    result,
    nextCursor,
  };
}

export async function fetchPreviousTitlesPage(cursor?: string) {
  const { result, previousCursor } = await PreviousTitlesPage(cursor);
  return {
    result,
    previousCursor,
  };
}
