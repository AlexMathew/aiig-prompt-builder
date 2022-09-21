import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import {
  useParameterSelection,
  useParameterSelectionUpdate,
  usePromptBaseUpdate,
} from "../context/PromptContext";
import {
  getRandomBasePrompt,
  getRandomSelectionFromArray,
} from "../utils/randomize";
import SaleModal from "./SaleModal";

const Builder: React.FC = () => {
  const [showSaleModal, setShowSaleModal] = useState<boolean>(false);
  const [promptInput, setPromptInput] = useState<string>("");
  const setPromptBase = usePromptBaseUpdate();
  const promptParameters = useParameterSelection();
  const setPromptParameter = useParameterSelectionUpdate();
  const currentUser = useCurrentUser();

  const closeModal = () => {
    setShowSaleModal(false);
  };

  const setRandomPrompt = () => {
    const randomPrompt = getRandomBasePrompt();
    setPromptInput(randomPrompt);
    const parameters = currentUser?.parameters ?? {};
    const randomParameterSelection: { [parameter: string]: string } = {};
    Object.keys(parameters)
      .slice(0, 4)
      .forEach((parameter) => {
        const randomOption = getRandomSelectionFromArray(
          Object.keys(parameters[parameter])
        );
        randomParameterSelection[parameter] = randomOption;
      });
    setPromptParameter(randomParameterSelection);
  };

  useEffect(() => {
    setPromptBase(promptInput);
  }, [promptInput]);

  return (
    <div className="w-2/3 max-h-screen h-screen grid items-center justify-center">
      <div className="font-bold text-md sm:text-xl -mb-10 mt-12 flex gap-4 items-center justify-center sm:justify-start">
        <img src="./logo.png" alt="" />
        Prompt Hero
      </div>
      <div className="w-full max-h-screen h-screen grid items-center grid-rows-5">
        <div className="row-span-1 flex items-center text-black border border-black rounded">
          <input
            className="bg-white appearance-none w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-[#FD6585]"
            id="inline-prompt"
            type="text"
            placeholder="Enter your description"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <button
            type="submit"
            className="flex gap-2 items-center h-9 px-4 py-4 m-2 border-black border-[0.5px] focus:outline-none focus:shadow-outline font-normal text-sm leading-4"
            onClick={setRandomPrompt}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 11.44L20 14.8571V12.5714H16L11 21.7143H8V19.4286H10L15 10.2857H20V8L24 11.44ZM8 10.2857H11L12.15 12.7657L11.03 14.8229L10 12.5714H8V10.2857ZM24 20.5829L20 24V21.7143H15L13.85 19.2343L14.97 17.1771L16 19.4286H20V17.1429L24 20.5829Z"
                fill="black"
              />
            </svg>
            <p className="hidden sm:block">Randomize</p>
          </button>
        </div>
        <div className="grid gap-4 h-full row-span-3 overflow-scroll">
          {Object.keys(currentUser.parameters || {}).map(
            (parameter: string, index: number) => (
              <div key={index}>
                {parameter}
                <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                  {Object.keys((currentUser.parameters || {})[parameter]).map(
                    (option: string, optionIndex: number) => {
                      const isSelected = promptParameters[parameter] === option;
                      return (
                        <div
                          key={`${index}_${optionIndex}`}
                          className={`cursor-pointer ${
                            isSelected ? "font-bold" : "font-normal"
                          } ${isSelected ? "text-black" : "text-gray-400"}`}
                          onClick={(e) => {
                            setPromptParameter({
                              [parameter]: isSelected ? "" : option,
                            });
                          }}
                        >
                          {(currentUser.parameters || {})[parameter][option]}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )
          )}
        </div>
        <div className="row-span-1 grid gap-4 mb-12">
          {!currentUser.paying ? (
            <div
              className="cursor-pointer underline font-bold h-2/3"
              onClick={() => setShowSaleModal(true)}
            >
              Load more prompts
            </div>
          ) : null}
          <div className="grid sm:hidden justify-center text-xl">▼</div>
        </div>
        {showSaleModal ? <SaleModal closeModal={closeModal} /> : null}
      </div>
    </div>
  );
};

export default Builder;
