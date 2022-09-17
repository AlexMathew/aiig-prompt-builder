import React, { useState, useContext } from "react";

const PromptBaseContext = React.createContext<string>("");
const PromptBaseUpdateContext = React.createContext<
  (PromptBase: string) => void
>(() => void 0);

interface ProviderArgs {
  children: React.ReactNode;
}

export const PromptBaseProvider = ({ children }: ProviderArgs) => {
  const [promptBase, setPromptBase] = useState<string>("");

  const updatePromptBase = (promptBase: string) => {
    setPromptBase(promptBase);
  };

  return (
    <PromptBaseContext.Provider value={promptBase}>
      <PromptBaseUpdateContext.Provider value={updatePromptBase}>
        {children}
      </PromptBaseUpdateContext.Provider>
    </PromptBaseContext.Provider>
  );
};

export const usePromptBase = () => {
  return useContext(PromptBaseContext);
};

export const usePromptBaseUpdate = () => {
  return useContext(PromptBaseUpdateContext);
};
