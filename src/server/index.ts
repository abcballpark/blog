import { publicProcedure, router } from "./trpc";
import fs from "fs";
import path from "path";
import type { Post } from "@/model";
import { z } from "zod";

/**
 * Loads and returns an array of posts from the "./posts" directory.
 */
const loadPosts = (): Post[] => {
  const posts = fs
    .readdirSync("./posts")
    .filter((file) => path.extname(file) === ".json")
    .map((file) => loadPostBySlug(path.basename(file, ".json")));
  return posts;
};

const loadPostBySlug = (slug: string): Post => {
  const filePath = path.join("./posts", `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post "${slug}" does not exist`);
  }

  const contents = fs.readFileSync(filePath, "utf8");
  const post = {
    ...JSON.parse(contents),
    slug,
  } as Post;
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
