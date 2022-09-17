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

interface ParameterSelectionType {
  [parameter: string]: string;
}

const ParameterSelectionContext = React.createContext<ParameterSelectionType>(
  {}
);
const ParameterSelectionUpdateContext = React.createContext<
  (ParameterSelection: ParameterSelectionType) => void
>(() => void 0);

export const ParameterSelectionProvider = ({ children }: ProviderArgs) => {
  const [parameterSelection, setParameterSelection] =
    useState<ParameterSelectionType>({});

  const updateParameterSelection = (ps: ParameterSelectionType) => {
    console.log("updateParameterSelection", parameterSelection, ps);

    setParameterSelection({ ...parameterSelection, ...ps });
  };

  return (
    <ParameterSelectionContext.Provider value={parameterSelection}>
      <ParameterSelectionUpdateContext.Provider
        value={updateParameterSelection}
      >
        {children}
      </ParameterSelectionUpdateContext.Provider>
    </ParameterSelectionContext.Provider>
  );
};

export const useParameterSelection = () => {
  return useContext(ParameterSelectionContext);
};

export const useParameterSelectionUpdate = () => {
  return useContext(ParameterSelectionUpdateContext);
};
