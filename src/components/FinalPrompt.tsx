import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import prompthero from "../api/prompthero";
import {
  useCurrentUser,
  useCurrentUserUpdate,
} from "../context/CurrentUserContext";
import {
  useParameterSelection,
  usePromptBase,
  useSelectedParametersOrder,
} from "../context/PromptContext";
import { supabase } from "../supabaseClient";
import AuthModal from "./AuthModal";

const FinalPrompt: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const prompt = usePromptBase();
  const promptParameters = useParameterSelection();
  const selectedParametersOrder = useSelectedParametersOrder();
  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserUpdate();

  const parametersText = selectedParametersOrder
    .map(
      (parameter) =>
        currentUser.parameters?.[parameter][promptParameters[parameter]]
    )
    .filter((option) => !!option)
    .join(", ");

  const finalText = `${prompt}${
    parametersText ? `${prompt ? ", " : ""}${parametersText}` : ""
  }`;

  const copyPrompt = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(finalText).then(
        () => {},
        (err) => {
          console.log("Failed to copy the text to clipboard.", err);
        }
      );
    }
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  useEffect(() => {
    setCopied(false);
  }, [finalText]);

  useEffect(() => {
    const fetcher = async () => {
      const user: User | null = supabase.auth.user();
      setSupabaseUser(user);
      const resp = await prompthero.get("/prompthero-get", {
        params: { email: user?.email },
      });
      setCurrentUser(resp.data);
    };

    fetcher();
  }, []);

  supabase.auth.onAuthStateChange(async (event, session) => {
    const user: User | null = session?.user || null;
    setSupabaseUser(user);
    const resp = await prompthero.get("/prompthero-get", {
      params: { email: user?.email },
    });
    setCurrentUser(resp.data);
  });

  return (
    <div
      className="h-screen w-full grid justify-items-center content-center"
      style={{
        background: "linear-gradient(45deg, #FD6585 0%, #FFD3A5 100%)",
      }}
    >
      <div className="w-5/6 flex flex-row-reverse -mt-8 mb-8">
        {supabaseUser ? (
          <button
            className=" bg-[#FD6585] text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Sign Out
          </button>
        ) : (
          <button
            className=" bg-[#FD6585] text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              setShowAuthModal(true);
            }}
          >
            Sign In
          </button>
        )}
      </div>
      <div className="w-4/5 h-[80vh] bg-white grid grid-rows-4 justify-items-center content-center rounded-lg shadow-lg">
        <div className="row-span-3 self-center w-3/4 max-h-full overflow-y-scroll">
          <div className="text-3xl font-normal leading-[60px]">{finalText}</div>
        </div>
        <div className="row-span-1 self-center">
          <button
            className=" bg-[#FD6585] text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              copyPrompt();
              setCopied(true);
            }}
          >
            {copied ? "Copied!" : "Copy To Clipboard"}
          </button>
        </div>
      </div>
      {showAuthModal ? <AuthModal closeModal={closeModal} /> : null}
    </div>
  );
};

export default FinalPrompt;
