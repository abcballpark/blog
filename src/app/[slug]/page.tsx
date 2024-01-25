"use client";

import { Page, PageHeader, PageBody } from "@saas-ui-pro/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Post } from "@/model";
import { trpc } from "@/trpc";

export default function Post({ params }: { params: { slug: string } }) {
  const post = trpc.getPostBySlug.useQuery(params.slug).data;
  if (!post) return <></>;
  return (
    <Page variant="hero" colorScheme="primary">
      <PageHeader title={post.data.title} description={post.data.subtitle} />
      <PageBody>
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </PageBody>
    </Page>
  );
}
