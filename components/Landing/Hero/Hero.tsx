import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function Hero() {
  return (
    <section className="flex h-full">
      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:flex lg:flex-col lg:h-full lg:justify-center lg:items-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl text-left sm:text-center">
          Untangle Requirements with AIgile:
          <strong className="block font-extrabold text-rose-300">
            Your AI-Powered
          </strong>{" "}
          Project Management Partner
        </h1>
        <p className="mt-4 max-w-lg sm:text-xl/relaxed text-slate-300 text-left sm:text-center">
          Effortlessly transform requirements into actionable user stories,
          prioritize tasks, and keep your team on the same page.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-center">
          <Button
            as={Link}
            className="text-white font-bold"
            color="primary"
            href="/chat"
            variant="solid"
          >
            Start your project
          </Button>
        </div>
      </div>
    </section>
  );
}
