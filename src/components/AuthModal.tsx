import React from "react";
import { Auth } from "@supabase/ui";
import { supabase } from "../supabaseClient";

interface AuthModalProps {
  closeModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ closeModal }) => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex content-center items-center justify-center bg-[#00000080]">
      <div className="h-1/4 w-1/3 bg-white flex flex-col items-center justify-center">
        <Auth
          providers={["google"]}
          supabaseClient={supabase}
          onlyThirdPartyProviders
          className="bg-white p-8"
        />
        <div className="text-sm underline cursor-pointer" onClick={closeModal}>
          Close
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
