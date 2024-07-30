import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Button,
  Link,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: userData, status } = useSession();
  const email = userData?.user?.email;
  const fetcher = (url: string, email: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());

  const { data } = useSWR("/api/v1/users-project", {
    fetcher: (url: string) => fetcher(url, email ?? ""),
  });

  return (
    <Navbar
      onClick={() => setIsMenuOpen((current) => !current)}
      onMenuOpenChange={setIsMenuOpen}
      onTouchEnd={() => setIsMenuOpen((current) => !current)}
    >
      <NavbarContent>
        <NavbarBrand>AIgile</NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <>
            {data?.project && data?.project?.slug ? (
              <NavbarItem>
                <Link
                  className="text-sky-400"
                  href={`/dashboard/${data.project.slug}`}
                >
                  My Project
                </Link>
              </NavbarItem>
            ) : null}
          </>
          <NavbarItem>
            <Link className="text-sky-400" href="/about">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-sky-400" href="/features">
              Services
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-sky-400" href="/pricing">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem>
            {status !== "authenticated" ? (
              <Button as={Link} href="/sign-in" variant="flat">
                Sign In
              </Button>
            ) : (
              <Button variant="flat" onClick={() => signOut()}>
                Sign Out
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarItem>
          {status !== "authenticated" ? (
            <Button as={Link} href="/sign-in" variant="flat">
              Sign In
            </Button>
          ) : (
            <Button variant="flat" onClick={() => signOut()}>
              Sign Out
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="w-10 h-10"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem className="text-end">
          <Link className="text-sky-400" href="/about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem className="text-end">
          <Link className="text-sky-400" href="/features">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem className="text-end">
          <Link className="text-sky-400" href="/pricing">
            Pricing
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
