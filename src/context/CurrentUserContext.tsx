import React, { useState, useContext } from "react";

interface ProviderArgs {
  children: React.ReactNode;
}

interface ParametersType {
  [parameter: string]: {
    [option: string]: string;
  };
}

interface CurrentUserType {
  paying?: boolean;
  parameters?: ParametersType;
}

const PLACEHOLDER_STATE: CurrentUserType = {
  paying: false,
  parameters: {},
};

const CurrentUserContext =
  React.createContext<CurrentUserType>(PLACEHOLDER_STATE);
const CurrentUserUpdateContext = React.createContext<
  (CurrentUser: CurrentUserType) => void
>(() => void 0);

export const CurrentUserProvider = ({ children }: ProviderArgs) => {
  const [currentUser, setCurrentUser] =
    useState<CurrentUserType>(PLACEHOLDER_STATE);

  const updateCurrentUser = (cu: CurrentUserType) => {
    setCurrentUser({ ...currentUser, ...cu });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserUpdateContext.Provider value={updateCurrentUser}>
        {children}
      </CurrentUserUpdateContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

export const useCurrentUserUpdate = () => {
  return useContext(CurrentUserUpdateContext);
};
