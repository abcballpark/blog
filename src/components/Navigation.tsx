"use client";

import {
  AppShell,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
} from "@saas-ui/react";
import { Box, Container, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();

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
            {
              // Only show the New Post link if the user is logged in and has the author role
              user?.publicMetadata?.author ? (
                <NavbarItem>
                  <NavbarLink isActive={pathname === "/posts/new"} href="/posts/new">
                    New Post
                  </NavbarLink>
                </NavbarItem>
              ) : (
                <></>
              )
            }
          </NavbarContent>
          <NavbarContent justifyContent="flex-end" spacing="2">
            <NavbarItem onClick={toggleColorMode}>
              {colorMode === "dark" ? (
                // Dark mode is on
                <IconButton
                  aria-label="Toggle light mode"
                  icon={<MdOutlineLightMode />}
                  variant="ghost"
                />
              ) : (
                // Light mode is on
                <IconButton
                  aria-label="Toggle dark mode"
                  icon={<MdOutlineDarkMode />}
                  variant="ghost"
                />
              )}
            </NavbarItem>
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
