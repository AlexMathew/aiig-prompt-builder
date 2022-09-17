import React, { useEffect, useState } from "react";
import { useParameterSelection, usePromptBase } from "../context/PromptContext";
import { PARAMETERS } from "../parameters";

const FinalPrompt: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const prompt = usePromptBase();
  const promptParameters = useParameterSelection();

  const parametersText = Object.keys(promptParameters)
    .map((parameter) => PARAMETERS[parameter][promptParameters[parameter]])
    .filter((option) => !!option)
    .join(", ");

  const finalText = `${prompt}${
    parametersText ? `${prompt ? ", " : ""}${parametersText}` : ""
  }`;

  const copyPrompt = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(finalText).then(
        () => {},
        (err) => {
          console.log("Failed to copy the text to clipboard.", err);
        }
      );
    }
  };

  useEffect(() => {
    setCopied(false);
  }, [finalText]);

  return (
    <div
      className="h-screen w-full grid justify-items-center content-center"
      style={{
        background: "linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)",
      }}
    >
      <div className="w-4/5 h-[80vh] bg-white grid grid-rows-4 justify-items-center content-center rounded-lg shadow-lg">
        <div className="row-span-3 self-center w-3/4">
          <div className="text-3xl font-normal leading-[60px]">{finalText}</div>
        </div>
        <div className="row-span-1 self-center">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[20vh]"
            onClick={() => {
              copyPrompt();
              setCopied(true);
            }}
          >
            {copied ? "Copied!" : "Copy To Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalPrompt;
