import { publicProcedure, router } from "./trpc";
import fs from "fs";
import path from "path";

interface Post {
  id: string;
  title: string;
  body: string;
}

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
      const jsonData = JSON.parse(fileContents);
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
