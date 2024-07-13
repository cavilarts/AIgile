import { Link } from "@nextui-org/link";

import DefaultLayout from "@/layouts/default";

export const metadata = {
  title: "AI-gile",
  description:
    "Untangle Requirements with Aigile: Your AI-Powered Project Management Partner",
};

export default function IndexPage() {
  return (
    <DefaultLayout>
      <h1>
        Untangle Requirements with Aigile: Your AI-Powered Project Management
        Partner
      </h1>
      <p>
        effortlessly transform requirements into actionable user stories,
        prioritize tasks, and keep your team on the same page.
      </p>
      <Link href="/chat">Start your project</Link>
    </DefaultLayout>
  );
}
