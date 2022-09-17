import React from "react";
import Builder from "./components/Builder";
import FinalPrompt from "./components/FinalPrompt";
import { PromptBaseProvider } from "./context/PromptContext";

const App: React.FC = () => {
  return (
    <PromptBaseProvider>
      <div className="h-screen grid grid-cols-2 gap-4 justify-items-center items-center">
        <Builder />
        <FinalPrompt />
      </div>
    </PromptBaseProvider>
  );
};

export default App;
