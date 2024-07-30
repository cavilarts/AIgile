import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export default function DashBoardMenu() {
  const { data: userData, status } = useSession();

  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>AIgile</NavbarBrand>
        <NavbarContent className="flex gap-4" justify="end">
          <NavbarItem>Welcome, {userData?.user?.name ?? "Guest"}</NavbarItem>
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
    </Navbar>
  );
}
