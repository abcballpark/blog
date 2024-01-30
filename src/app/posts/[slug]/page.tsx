"use client";

import { Page, PageHeader, PageBody } from "@saas-ui-pro/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { trpc } from "@/trpc";

export default function Post({ params }: { params: { slug: string } }) {
  const getPost = trpc.getPostBySlug.useQuery(params.slug);
  if (!getPost.data) return <></>;
  const post = getPost.data;
  return (
    <Page variant="hero" colorScheme="primary">
      <PageHeader title={post.title} description={post.subtitle} />
      <PageBody>
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </PageBody>
    </Page>
  );
}
