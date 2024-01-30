"use client";

import { Box, Text, Tag } from "@chakra-ui/react";
import {
  StructuredList,
  StructuredListItem,
  StructuredListCell,
} from "@saas-ui/react";
import TimeAgo from "timeago-react";
import { useRouter } from "next/navigation";

import { POSTS_BASE_URL } from "@/constants";
import { trpc } from "@/trpc";

export function PostList() {
  const getPosts = trpc.getPosts.useQuery();
  const router = useRouter();

  return (
    <Box>
      <StructuredList>
        {getPosts.data?.map((post) => (
          <StructuredListItem
            key={post.slug}
            onClick={() => router.push(`${POSTS_BASE_URL}/${post.slug}` || "#")}
          >
            <StructuredListCell>
              <Text fontWeight="bold">{post.title}</Text>
              <Text fontSize="md" noOfLines={1}>
                {post.subtitle}
              </Text>
            </StructuredListCell>
            <StructuredListCell>
              <Tag>
                <TimeAgo datetime={post.createdOn} />
              </Tag>
            </StructuredListCell>
          </StructuredListItem>
        ))}
      </StructuredList>
    </Box>
  );
}
