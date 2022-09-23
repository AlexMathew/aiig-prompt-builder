import React from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import {
  useParameterSelection,
  useParameterSelectionUpdate,
} from "../context/PromptContext";

interface OptionsSectionProps {
  parameter: string;
  index: number;
  seeMoreOfParameter: boolean;
  toggleSeeMoreOfParameter: (parameter: string) => void;
}

const SHOW_IN_FIRST_VIEW = 10;

const OptionsSection: React.FC<OptionsSectionProps> = ({
  parameter,
  index,
  seeMoreOfParameter,
  toggleSeeMoreOfParameter,
}) => {
  const promptParameters = useParameterSelection();
  const setPromptParameter = useParameterSelectionUpdate();
  const currentUser = useCurrentUser();

  const getParameterOptionsDiv = (
    range: string[],
    parameter: string,
    index: number
  ) => {
    return (
      <>
        {range.map((option: string, optionIndex: number) => {
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
        })}
      </>
    );
  };

  return (
    <>
      {getParameterOptionsDiv(
        Object.keys((currentUser.parameters || {})?.[parameter]).slice(
          0,
          SHOW_IN_FIRST_VIEW
        ),
        parameter,
        index
      )}
      {Object.keys((currentUser.parameters || {})?.[parameter]).length >
      SHOW_IN_FIRST_VIEW ? (
        seeMoreOfParameter ? (
          getParameterOptionsDiv(
            Object.keys((currentUser.parameters || {})?.[parameter]).slice(
              SHOW_IN_FIRST_VIEW
            ),
            parameter,
            index
          )
        ) : (
          <div
            className={`cursor-pointer font-normal text-[#FD6585]`}
            onClick={(e) => {
              toggleSeeMoreOfParameter(parameter);
            }}
          >
            See More
          </div>
        )
      ) : null}
      {seeMoreOfParameter ? (
        <div
          className={`cursor-pointer font-normal text-[#FD6585]`}
          onClick={(e) => {
            toggleSeeMoreOfParameter(parameter);
          }}
        >
          See Less
        </div>
      ) : null}
    </>
  );
};

export default OptionsSection;
