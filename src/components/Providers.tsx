"use client";

import { SaasProvider } from "@saas-ui/react";
import { AuthProvider } from "@saas-ui/auth";
import { ClerkAuthProvider } from "@saas-ui/clerk";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

import { trpc } from "@/trpc";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "/api/trpc" })],
    })
  );

  return (
    <ClerkAuthProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {({ authService }) => (
        <SaasProvider>
          <AuthProvider {...authService}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </trpc.Provider>
          </AuthProvider>
        </SaasProvider>
      )}
    </ClerkAuthProvider>
  );
}
