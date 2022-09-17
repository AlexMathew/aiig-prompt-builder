import React from "react";
import { usePromptBaseUpdate } from "../context/PromptContext";

const Builder: React.FC = () => {
  const setPromptBase = usePromptBaseUpdate();

  return (
    <div className="w-2/3">
      <input
        className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id="inline-prompt"
        type="text"
        onChange={(e) => setPromptBase(e.target.value)}
      />
    </div>
  );
};

export default Builder;
