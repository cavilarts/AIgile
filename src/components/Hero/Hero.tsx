import { authOptions } from "@/lib/auth/auth";
import { getProjectByUser, getUserByEmail } from "@/lib/db";
import { Project } from "@/types";
import { Button, Link } from "@nextui-org/react";
import { getServerSession } from "next-auth";

export default async function Hero() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = email ? await getUserByEmail(email) : null;
  const data = user?.data?._id
    ? ((await getProjectByUser(user.data._id)) as Project)
    : null;

  return (
    <section className="flex h-screen">
      <div className="relative mx-auto max-w-screen-xl flex flex-col h-full justify-center items-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl text-left sm:text-center">
          Untangle Requirements with AIgile:
          <strong className="block font-extrabold text-rose-300">
            Your AI-Powered
          </strong>{" "}
          Project Management Partner
        </h1>
        <p className="mt-4 max-w-lg sm:text-xl/relaxed text-secondary-900 text-left sm:text-center">
          Effortlessly transform requirements into actionable user stories,
          prioritize tasks, and keep your team on the same page.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-center">
          <Button
            as={Link}
            className="text-white bg-sky-400 text-xl"
            color="primary"
            href={data && data.slug ? `/dashboard/${data.slug}` : "/chat"}
            variant="solid"
          >
            {data && data?.slug
              ? "Take me to My Project"
              : "Start your project"}
          </Button>
        </div>
      </div>
    </section>
  );
}
