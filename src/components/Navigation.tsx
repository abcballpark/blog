"use client";

import { useAuth } from "@saas-ui/auth";

import {
  AppShell,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
} from "@saas-ui/react";

import { Box, Button, Container } from "@chakra-ui/react";

import { useRouter } from "next/navigation";

export function Navigation({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

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
              {auth.isAuthenticated ? (
                <Button onClick={() => router.push("/auth")}>Login</Button>
              ) : (
                <Button onClick={() => auth.logOut()}>Logout</Button>
              )}
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
