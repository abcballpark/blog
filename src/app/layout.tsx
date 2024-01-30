import type { Metadata } from "next";

import { Providers, Navigation } from "@/components";

export const metadata: Metadata = {
  title: "ABC DevBlog",
  description: "Follow development progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Providers>
          <Navigation>{children}</Navigation>
        </Providers>
      </body>
    </html>
  );
}
