import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", {
      callbackUrl: `/chat`,
    });
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <FcGoogle />
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
}
