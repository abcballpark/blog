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
            key={post.id}
            onClick={() => router.push(post.slug || "#")}
          >
            <StructuredListCell>
              <Text fontWeight="bold">{post.title}</Text>
              <Text fontSize="md" noOfLines={1}>
                {post.subtitle}
              </Text>
            </StructuredListCell>
            <StructuredListCell>
              <Tag>
                <TimeAgo datetime={post.created} />
              </Tag>
            </StructuredListCell>
          </StructuredListItem>
        ))}
      </StructuredList>
    </Box>
  );
}
