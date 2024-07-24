'use client'

import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { useAIState } from 'ai/rsc';
import { generateJSON } from "@/app/actions/generateJSON";

export default function GenerateJSONButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [ {messages} ] = useAIState();

  const handleGenerate = async () => {
    setIsGenerating(true);

    if (messages[messages.length - 1].role === "assistant") {
      messages.pop();
    }

    try {
      const result = await generateJSON(messages );
      
      if (result.success) {
        alert(result.message);
        // TODO: redirect to the visual output page
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
      {isGenerating ? 'Generating...' : 'Generate Visual Output'}
    </Button>
  );
}