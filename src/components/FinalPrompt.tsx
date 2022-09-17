import React from "react";
import { usePromptBase } from "../context/PromptContext";

const FinalPrompt: React.FC = () => {
  const prompt = usePromptBase();

  return <div className="text-3xl font-bold underline">{prompt}</div>;
};

export default FinalPrompt;
