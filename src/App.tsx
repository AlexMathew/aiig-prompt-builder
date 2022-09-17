import React from "react";
import { Auth } from "@supabase/ui";
import Builder from "./components/Builder";
import FinalPrompt from "./components/FinalPrompt";
import {
  ParameterSelectionProvider,
  PromptBaseProvider,
} from "./context/PromptContext";
import { supabase } from "./supabaseClient";

const App: React.FC = () => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <PromptBaseProvider>
        <ParameterSelectionProvider>
          <div className="h-screen grid grid-cols-2 justify-items-center">
            <Builder />
            <FinalPrompt />
          </div>
        </ParameterSelectionProvider>
      </PromptBaseProvider>
    </Auth.UserContextProvider>
  );
};

export default App;
