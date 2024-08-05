"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function AboutAccordion() {
  return (
    <section className="bg-white px-8 relative mt-10 rounded-md">
      <Accordion selectionMode="multiple">
        <AccordionItem
          key="what-we-do"
          aria-label="What we do"
          title="What we do"
        >
          {`
                  AI-gile is more than just a project management tool. It is an
                  intelligent assistant that helps you to create and manage your
                  project requirements. Our AI assistant uses natural language
                  processing to understand your requirements and provide you with
                  actionable insights.
                `}
        </AccordionItem>
        <AccordionItem
          key="how-we-do-it"
          aria-label="How we do it"
          title="How we do it"
        >
          {`
                Our AI assistant uses machine learning algorithms to analyze your
                requirements and provide you with recommendations on how to
                improve your project. It can help you to identify and prioritize
                the most important requirements for your project.`}
        </AccordionItem>
        <AccordionItem
          key="why-we-do-it"
          aria-label="Why we do it"
          title="Why we do it"
        >
          {` We believe that project management should be easy and
                straightforward. Our AI assistant is designed to help you to
                create and manage your project requirements in a simple and
                intuitive way.`}
        </AccordionItem>
      </Accordion>
    </section>
  );
}
