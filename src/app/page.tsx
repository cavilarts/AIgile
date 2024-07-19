import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Hero/Hero";

export const metadata = {
  title: "AI-gile",
  description:
    "Untangle Requirements with Aigile: Your AI-Powered Project Management Partner",
};

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="landing-bg w-screen h-screen fixed top-0 left-0" />
      <Hero />
    </DefaultLayout>
  );
}
