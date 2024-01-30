import { authorProcedure, publicProcedure, router } from "./trpc";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { db, Posts } from "@/db";

export const appRouter = router({
  getPosts: publicProcedure.query(async (params) => {
    const posts = await db.select().from(Posts);
    return posts;
  }),
  getPostBySlug: publicProcedure.input(z.string()).query(async (params) => {
    const posts = await db.select().from(Posts).where(eq(Posts.slug, params.input));
    return posts[0] || {}; // TODO (kevin): Eww, fix this.
  }),
  createPost: authorProcedure.input(createInsertSchema(Posts)).mutation(async (params) => {
    params.input.createdOn = new Date();
    const post = await db.insert(Posts).values(params.input);
    return post;
  }),
});

export type AppRouter = typeof appRouter;
