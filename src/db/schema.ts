import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const Posts = pgTable(
  "Posts",
  {
    slug: text("slug").primaryKey(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    author: text("author").notNull(),
    content: text("content").notNull(),
    createdOn: timestamp("created_on").default(new Date()).notNull(),
    publishedOn: timestamp("published_on"),
  },
  (posts) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(posts.slug),
    };
  }
);
