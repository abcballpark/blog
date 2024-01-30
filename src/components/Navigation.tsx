"use client";

import {
  AppShell,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
} from "@saas-ui/react";
import { Box, Container } from "@chakra-ui/react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AppShell
      navbar={
        <Navbar position="sticky">
          <NavbarBrand>ABC DevBlog</NavbarBrand>
          <NavbarContent>
            <NavbarItem>
              <NavbarLink isActive={pathname === "/"} href="/">
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink isActive={pathname === "/about"} href="/about">
                About
              </NavbarLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justifyContent="flex-end" spacing="2">
            <NavbarItem>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      }
    >
      <Box as="main" flex="1" py="2" px="4">
        <Container
          maxW="container.xl"
          pt="8"
          px="8"
          display="flex"
          flexDirection="column"
          margin="0 auto"
        >
          {children}
        </Container>
      </Box>
    </AppShell>
  );
}
