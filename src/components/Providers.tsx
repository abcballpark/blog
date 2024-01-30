"use client";

import { SaasProvider } from "@saas-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { TRPC_BASE_URL } from "@/constants";

import { trpc } from "@/trpc";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: TRPC_BASE_URL })],
    })
  );

  return (
    <ClerkProvider>
      <SaasProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
      </SaasProvider>
    </ClerkProvider>
  );
}
