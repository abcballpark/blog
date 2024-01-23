import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getPosts: publicProcedure.query(async (a) => {
    return [
      {
        id: 1,
        title: "Post 1",
        body: "This is Post #1. Isn't it great?",
      },
      {
        id: 2,
        title: "Post 2",
        body: "This is Post #2. Isn't it marvelous?",
      },
    ];
  }),
});

export type AppRouter = typeof appRouter;
