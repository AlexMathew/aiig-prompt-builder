import React from "react";
import { Auth } from "@supabase/ui";
import Builder from "./components/Builder";
import FinalPrompt from "./components/FinalPrompt";
import {
  ParameterSelectionProvider,
  PromptBaseProvider,
} from "./context/PromptContext";
import { supabase } from "./supabaseClient";
import { CurrentUserProvider } from "./context/CurrentUserContext";

const App: React.FC = () => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <CurrentUserProvider>
        <PromptBaseProvider>
          <ParameterSelectionProvider>
            <div className="h-screen grid sm:grid-cols-2 justify-items-center">
              <Builder />
              <FinalPrompt />
            </div>
          </ParameterSelectionProvider>
        </PromptBaseProvider>
      </CurrentUserProvider>
    </Auth.UserContextProvider>
  );
};

export default App;
