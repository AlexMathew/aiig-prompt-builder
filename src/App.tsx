import React from "react";
import { Auth } from "@supabase/ui";
import Builder from "./components/Builder";
import FinalPrompt from "./components/FinalPrompt";
import {
  ParameterSelectionProvider,
  PromptBaseProvider,
  SelectedParametersOrderProvider,
} from "./context/PromptContext";
import { supabase } from "./supabaseClient";
import { CurrentUserProvider } from "./context/CurrentUserContext";

const App: React.FC = () => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <CurrentUserProvider>
        <PromptBaseProvider>
          <ParameterSelectionProvider>
            <SelectedParametersOrderProvider>
              <div className="h-screen grid sm:grid-cols-8 justify-items-center">
                <div className="col-span-5 w-full grid justify-items-center">
                  <Builder />
                </div>
                <div className="col-span-3 w-full">
                  <FinalPrompt />
                </div>
              </div>
            </SelectedParametersOrderProvider>
          </ParameterSelectionProvider>
        </PromptBaseProvider>
      </CurrentUserProvider>
    </Auth.UserContextProvider>
  );
};

export default App;
