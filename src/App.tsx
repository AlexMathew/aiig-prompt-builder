import React from "react";
import Builder from "./components/Builder";
import FinalPrompt from "./components/FinalPrompt";
import {
  ParameterSelectionProvider,
  PromptBaseProvider,
} from "./context/PromptContext";

const App: React.FC = () => {
  return (
    <PromptBaseProvider>
      <ParameterSelectionProvider>
        <div className="h-screen grid grid-cols-2 justify-items-center">
          <Builder />
          <FinalPrompt />
        </div>
      </ParameterSelectionProvider>
    </PromptBaseProvider>
  );
};

export default App;
