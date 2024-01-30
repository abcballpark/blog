"use client";

import { SaasProvider } from "@saas-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { extendTheme } from "@chakra-ui/react";
import { theme as proTheme } from "@saas-ui-pro/react";
import { TRPC_BASE_URL } from "@/constants";

import { trpc } from "@/trpc";

const theme = extendTheme(
  {
    initialColorMode: "dark",
  },
  proTheme
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: TRPC_BASE_URL })],
    })
  );

  return (
    <ClerkProvider>
      <SaasProvider theme={theme}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
      </SaasProvider>
    </ClerkProvider>
  );
}
