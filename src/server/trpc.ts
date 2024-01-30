import { TRPCError, initTRPC } from "@trpc/server";
import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { db } from "@/db";

type AuthContext = SignedInAuthObject | SignedOutAuthObject;

type CreateContextOptions = {
  headers: Headers;
  auth: AuthContext;
  req?: NextRequest;
};

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    ...opts,
    db,
  };
};

export const createTRPCContext = async (opts: {
  headers: Headers;
  auth: AuthContext;
  req?: NextRequest;
}) => {
  return createInnerTRPCContext({
    auth: opts.auth,
    req: opts.req,
    headers: opts.headers,
  });
};

export const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

const isAuthenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do that.",
    });
  }
  return next({
    ctx: {
      auth: {
        ...ctx.auth,
        userId: ctx.auth.userId,
      },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);

const isAuthor = t.middleware(({ next, ctx }) => {
  // Check if user is an author
  if (!ctx.auth?.user?.publicMetadata?.author) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be an author to do that.",
    });
  }
  return next({
    ctx: {
      auth: {
        ...ctx.auth,
        userId: ctx.auth.userId,
        isAuthor: true,
      },
    },
  });
});

export const authorProcedure = t.procedure.use(isAuthor);
