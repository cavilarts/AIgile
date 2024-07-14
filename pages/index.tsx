import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Landing/Hero/Hero";

export const metadata = {
  title: "AI-gile",
  description:
    "Untangle Requirements with Aigile: Your AI-Powered Project Management Partner",
};

export default function IndexPage() {
  return (
    <DefaultLayout>
      <Hero />
    </DefaultLayout>
  );
}
