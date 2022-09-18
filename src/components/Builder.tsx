import React, { useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import {
  useParameterSelection,
  useParameterSelectionUpdate,
  usePromptBaseUpdate,
} from "../context/PromptContext";
import SaleModal from "./SaleModal";

const Builder: React.FC = () => {
  const [showSaleModal, setShowSaleModal] = useState<boolean>(false);
  const setPromptBase = usePromptBaseUpdate();
  const promptParameters = useParameterSelection();
  const setPromptParameter = useParameterSelectionUpdate();
  const currentUser = useCurrentUser();

  const closeModal = () => {
    setShowSaleModal(false);
  };

  return (
    <div className="w-2/3 max-h-screen h-screen grid items-center justify-center">
      <div className="font-bold text-xl sm:text-3xl mt-4 flex gap-4 items-center justify-center sm:justify-start">
        <img src="./logo.png" alt="" />
        Prompt Hero
      </div>
      <div className="w-full max-h-screen h-screen grid items-center grid-rows-5">
        <div className="row-span-1">
          <input
            className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-prompt"
            type="text"
            placeholder="Enter your description"
            onChange={(e) => setPromptBase(e.target.value)}
          />
        </div>
        <div className="grid gap-4 h-full row-span-3 overflow-scroll">
          {Object.keys(currentUser.parameters || {}).map(
            (parameter: string, index: number) => (
              <div key={index}>
                {parameter}
                <div className="grid grid-cols-3 gap-x-4">
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
        {!currentUser.paying ? (
          <div
            className="row-span-1 cursor-pointer underline font-bold h-2/3"
            onClick={() => setShowSaleModal(true)}
          >
            Load more prompts
          </div>
        ) : null}
        {showSaleModal ? <SaleModal closeModal={closeModal} /> : null}
      </div>
    </div>
  );
};

export default Builder;
