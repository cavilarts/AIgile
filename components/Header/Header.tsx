import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>AIgile</NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarItem>
            <Link href="/about">About</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/features">Services</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/pricing">Pricing</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarItem>
          <Button as={Link} href="/sign-up" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem>
          <Link href="/about">About</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/features">Services</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/pricing">Pricing</Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
