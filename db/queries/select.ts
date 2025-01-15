import { asc, desc, eq, gt, like, lt } from "drizzle-orm";
import { db } from "../db";
import { mntTable } from "../schema";

export const getTvSeries = async () => {
  const result = await db
    .select()
    .from(mntTable)
    .where(eq(mntTable.titleType, "TV Series"))
    .orderBy(desc(mntTable.rating))
    .limit(10);
  return result;
};

export const getTitleById = async (id: string) => {
  const result = await db.select().from(mntTable).where(eq(mntTable.id, id));
  return result;
};

export const getAllTitles = async () => {
  const result = await db
    .select()
    .from(mntTable)
    .orderBy(asc(mntTable.id))
    .limit(10);
  return result;
};

export const getTitlesByGenres = async (genres: string) => {
  const result = await db
    .select()
    .from(mntTable)
    .where(like(mntTable.genres, `%${genres}%`))
    .orderBy(desc(mntTable.id))
    .limit(10);
  return result;
};

export const NextTitlesPage = async (cursor?: string, pageSize = 10) => {
  const result = await db
    .select()
    .from(mntTable)
    .where(cursor ? gt(mntTable.id, cursor) : undefined)
    .limit(pageSize)
    .orderBy(asc(mntTable.id));

  const nextCursor =
    result.length > 0 ? result[result.length - 1].id : undefined;
  return {
    result,
    nextCursor,
  };
};

export const PreviousTitlesPage = async (cursor?: string, pageSize = 10) => {
  const result = await db
    .select()
    .from(mntTable)
    .where(cursor ? lt(mntTable.id, cursor) : undefined)
    .limit(pageSize)
    .orderBy(asc(mntTable.id));

  const previousCursor = result.length > 0 ? result[0].id : undefined;
  return {
    result,
    previousCursor,
  };
};

export const searchTitles = async (query: string) => {
  const result = await db
    .select()
    .from(mntTable)
    .where(like(mntTable.title, `%${query}%`))
    .limit(10);
  return result;
};
