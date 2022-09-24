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

interface updateSelectedParametersOrderParams {
  addParameter?: string;
  removeParameter?: string;
  updatedOrder?: string[];
}

const SelectedParametersOrderContext = React.createContext<string[]>([]);
const SelectedParametersOrderUpdateContext = React.createContext<
  (SelectedParametersOrder: updateSelectedParametersOrderParams) => void
>(() => void 0);

export const SelectedParametersOrderProvider = ({ children }: ProviderArgs) => {
  const [selectedParametersOrder, setSelectedParametersOrder] = useState<
    string[]
  >([]);

  const updateSelectedParametersOrder = ({
    addParameter,
    removeParameter,
    updatedOrder,
  }: updateSelectedParametersOrderParams) => {
    if (addParameter) {
      setSelectedParametersOrder([...selectedParametersOrder, addParameter]);
    } else if (removeParameter) {
      setSelectedParametersOrder([
        ...selectedParametersOrder.filter((p) => p !== removeParameter),
      ]);
    } else if (updatedOrder) {
      setSelectedParametersOrder([...updatedOrder]);
    }
  };

  return (
    <SelectedParametersOrderContext.Provider value={selectedParametersOrder}>
      <SelectedParametersOrderUpdateContext.Provider
        value={updateSelectedParametersOrder}
      >
        {children}
      </SelectedParametersOrderUpdateContext.Provider>
    </SelectedParametersOrderContext.Provider>
  );
};

export const useSelectedParametersOrder = () => {
  return useContext(SelectedParametersOrderContext);
};

export const useSelectedParametersOrderUpdate = () => {
  return useContext(SelectedParametersOrderUpdateContext);
};
