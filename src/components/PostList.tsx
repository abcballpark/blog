"use client";

import { Box, Text, Tag } from "@chakra-ui/react";
import {
  StructuredList,
  StructuredListItem,
  StructuredListCell,
} from "@saas-ui/react";
import TimeAgo from "timeago-react";

import { useRouter } from "next/navigation";

import { trpc } from "@/trpc";

export function PostList() {
  const getPosts = trpc.getPosts.useQuery();
  const router = useRouter();

  return (
    <Box>
      <StructuredList>
        {getPosts.data?.map((post) => (
          <StructuredListItem
            key={post.data.slug}
            onClick={() => router.push(post.data.slug || "#")}
          >
            <StructuredListCell>
              <Text fontWeight="bold">{post.data.title}</Text>
              <Text fontSize="md" noOfLines={1}>
                {post.data.subtitle}
              </Text>
            </StructuredListCell>
            <StructuredListCell>
              <Tag>
                <TimeAgo datetime={post.data.created} />
              </Tag>
            </StructuredListCell>
          </StructuredListItem>
        ))}
      </StructuredList>
    </Box>
  );
}
