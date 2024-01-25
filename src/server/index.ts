import { publicProcedure, router } from "./trpc";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

import type { Post } from "@/model";

const POST_EXT = ".md";

/**
 * Loads and returns an array of posts from the "./posts" directory.
 */
const loadPosts = () => {
  const posts = fs
    .readdirSync("./posts")
    .filter((file) => path.extname(file) === POST_EXT)
    .map((file) => loadPostBySlug(path.basename(file, POST_EXT)));
  return posts;
};

const loadPostBySlug = (slug: string) => {
  const filePath = path.join("../../posts", slug + POST_EXT);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post "${slug}" does not exist`);
  }

  const contents = fs.readFileSync(filePath, "utf8");
  const post = matter(contents);
  return post;
};

export const appRouter = router({
  getPosts: publicProcedure.query(async (params) => {
    return loadPosts();
  }),
  getPostBySlug: publicProcedure.input(z.string()).query(async (params) => {
    return loadPostBySlug(params.input);
  }),
});

export type AppRouter = typeof appRouter;
