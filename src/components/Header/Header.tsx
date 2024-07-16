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
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onClick={() => setIsMenuOpen((current) => !current)}
      onMenuOpenChange={setIsMenuOpen}
      onTouchEnd={() => setIsMenuOpen((current) => !current)}
    >
      <NavbarContent>
        <NavbarBrand>AIgile</NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
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
