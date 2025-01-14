import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const mntTable = sqliteTable('mnt', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  titleType: text('title_type').notNull(),
  image: text('image').notNull(),
  releaseYear: text('release_year').notNull(),
  rating: text('rating').notNull(),
  certificate: text('certificate').notNull(),
  genres: text('genres').notNull(),
  description: text('description').notNull(),
  voteCount: text('vote_count').notNull(),
  duration: text('duration').notNull(),
});


export type InsertMnt = typeof mntTable.$inferInsert;
export type SelectMnt = typeof mntTable.$inferSelect;
