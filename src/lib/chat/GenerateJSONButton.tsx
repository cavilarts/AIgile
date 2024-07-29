"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useAIState } from "ai/rsc";
import { generateJSON } from "@/app/actions/generateJSON";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function GenerateJSONButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [{ messages }] = useAIState();
  const router = useRouter();

  const handleGenerate = async () => {
    setIsGenerating(true);

    if (messages[messages.length - 1].role === "assistant") {
      messages.pop();
    }

    try {
      const result = await generateJSON(messages);
      const { response: rawResponse } = result;

      if (result.success && rawResponse) {
        try {
          const parsedJSON = JSON.parse(rawResponse);
          const data = await fetch("/api/v1/project/create", {
            method: "POST",
            body: JSON.stringify(parsedJSON),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());

          if (data.slug) {
            router.push(`/dashboard/${data.slug}`);
          } else {
            alert("An error occurred while creating the project.");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("An error occurred while parsing the visual output data.");
        }
      } else {
        alert("An error occurred while generating the visual output data.");
      }
    } catch (error) {
      console.error("Error generating JSON:", error);
      alert("An error occurred while generating the visual output data.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleGenerate} disabled={isGenerating}>
      {isGenerating ? "Generating..." : "Generate Visual Output"}
    </Button>
  );
}
