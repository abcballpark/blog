import { publicProcedure, router } from "./trpc";
import fs from "fs";
import path from "path";
import type { Post } from "@/model";

/**
 * Loads and returns an array of posts from the "./posts" directory.
 */
const loadPosts = (): Post[] => {
  const posts = fs
    .readdirSync("./posts")
    .filter((file) => path.extname(file) === ".json")
    .map((file) => {
      const filePath = path.join("./posts", file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const jsonData = {
        ...JSON.parse(fileContents),
        slug: path.basename(file, ".json"),
      } as Post;
      return jsonData;
    });
  return posts;
};

export const appRouter = router({
  getPosts: publicProcedure.query(async (a) => {
    return loadPosts();
  }),
});

export type AppRouter = typeof appRouter;
