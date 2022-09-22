import React from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import {
  useParameterSelection,
  useParameterSelectionUpdate,
} from "../context/PromptContext";

interface ParameterSelectionProps {}

const ParameterSelection: React.FC<ParameterSelectionProps> = () => {
  const promptParameters = useParameterSelection();
  const setPromptParameter = useParameterSelectionUpdate();
  const currentUser = useCurrentUser();

  return (
    <>
      {Object.keys(currentUser.parameters || {}).map(
        (parameter: string, index: number) => (
          <div key={index} className="flex flex-row gap-4">
            <div className="w-[4%] min-w-[4%]">X</div>
            <div className="w-[4%] min-w-[4%]">X</div>
            <div className="w-[28%] min-w-[28%] text-base font-medium">
              {parameter}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
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
    </>
  );
};

export default ParameterSelection;
