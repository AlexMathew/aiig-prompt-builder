import React from "react";
import {
  useParameterSelection,
  useParameterSelectionUpdate,
  usePromptBaseUpdate,
} from "../context/PromptContext";
import { PARAMETERS } from "../parameters";

const Builder: React.FC = () => {
  const setPromptBase = usePromptBaseUpdate();
  const promptParameters = useParameterSelection();
  const setPromptParameter = useParameterSelectionUpdate();

  return (
    <div className="w-2/3 max-h-screen h-screen grid items-center">
      <div className="grid gap-4 max-h-full h-2/3 overflow-scroll">
        <input
          className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-prompt"
          type="text"
          onChange={(e) => setPromptBase(e.target.value)}
        />
        {Object.keys(PARAMETERS).map((parameter: string, index: number) => (
          <div key={index}>
            {parameter}
            <div className="grid grid-cols-3 gap-x-4">
              {Object.keys(PARAMETERS[parameter]).map(
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
                      {PARAMETERS[parameter][option]}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Builder;
