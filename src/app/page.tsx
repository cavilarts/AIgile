import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Hero/Hero";
import AboutIcon from "@/components/About/AboutIcon";
import AboutAccordion from "@/components/About/AboutAccordion";

export const metadata = {
  title: "AI-gile",
  description:
    "Untangle Requirements with Aigile: Your AI-Powered Project Management Partner",
};

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex h-full flex-col px-6">
        <div className="landing-bg w-screen h-screen fixed top-0 left-0" />
        <Hero />
        <div id="about">
          <h2 className="text-2xl font-extrabold sm:text-5xl text-left sm:text-center mb-4">
            About
          </h2>
          <AboutIcon />
          <AboutAccordion />
        </div>
      </section>
    </DefaultLayout>
  );
}
