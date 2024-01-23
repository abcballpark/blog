"use client";

import { trpc } from "../_trpc/client";

export default function PostList() {
  const getPosts = trpc.getPosts.useQuery();

  return (
    <div>
      {getPosts.data?.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
