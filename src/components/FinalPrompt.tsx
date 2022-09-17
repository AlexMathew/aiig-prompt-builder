import React from "react";
import { useParameterSelection, usePromptBase } from "../context/PromptContext";
import { PARAMETERS } from "../parameters";

const FinalPrompt: React.FC = () => {
  const prompt = usePromptBase();
  const promptParameters = useParameterSelection();

  const parametersText = Object.keys(promptParameters)
    .map((parameter) => PARAMETERS[parameter][promptParameters[parameter]])
    .filter((option) => !!option)
    .join(", ");

  return (
    <div className="text-3xl font-bold w-2/3">
      {prompt}
      {parametersText ? `${prompt ? "," : ""} ${parametersText}` : ""}
    </div>
  );
};

export default FinalPrompt;
