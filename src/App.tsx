import React from "react";
import Builder from "./components/Builder";
import FinalPrompt from "./components/FinalPrompt";

const App: React.FC = () => {
  return (
    <div className="h-screen grid grid-cols-2 gap-4 justify-items-center items-center">
      <Builder />
      <FinalPrompt />
    </div>
  );
};

export default App;
