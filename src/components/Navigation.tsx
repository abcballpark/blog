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

export function Navigation({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navbar={
        <Navbar position="sticky">
          <NavbarBrand></NavbarBrand>
          <NavbarContent>
            <NavbarItem>
              <NavbarLink isActive aria-current="page" href="/">
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">About</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Contact</NavbarLink>
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
