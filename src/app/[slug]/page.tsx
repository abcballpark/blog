"use client";

import { trpc } from "@/trpc";

export default function Post({ params }: { params: { slug: string } }) {
  const getPostBySlug = trpc.getPostBySlug.useQuery(params.slug);
  return <p>{getPostBySlug.data?.body}</p>;
}
