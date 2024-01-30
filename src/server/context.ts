// import * as trpc from "@trpc/server";
// import * as trpcNext from "@trpc/server/adapters/next";
// import {
//   getAuth,
//   SignedInAuthObject,
//   SignedOutAuthObject,
// } from "@clerk/nextjs/server";
// import { NextRequest } from "next/server";

// import { db } from "@/db";

// type AuthContext = SignedInAuthObject | SignedOutAuthObject;

// interface CreateContextOptions {
//   headers: Headers;
//   auth: AuthContext;
//   req?: NextRequest;
// }

// export const createInnerContext = (options: CreateContextOptions) => {
//   return {
//     ...options,
//     db,
//   };
// };

// export const createContext = async (opts: CreateContextOptions) => {
//   return createContextInner({});
// };

// export type Context = trpc.inferAsyncReturnType<typeof createContext>;
