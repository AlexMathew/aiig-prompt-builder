import React, { useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import {
  useSelectedParametersOrder,
  useSelectedParametersOrderUpdate,
} from "../context/PromptContext";
import OptionsSection from "./OptionsSection";

interface ParameterSelectionProps {}

const ParameterSelection: React.FC<ParameterSelectionProps> = () => {
  const [seeMoreOfParameter, setSeeMoreOfParameter] = useState<{
    [parameter: string]: boolean;
  }>({});
  const currentUser = useCurrentUser();
  const selectedParametersOrder = useSelectedParametersOrder();
  const updateSelectedParametersOrder = useSelectedParametersOrderUpdate();

  const toggleSeeMoreOfParameter = (parameter: string) => {
    setSeeMoreOfParameter({
      ...seeMoreOfParameter,
      [parameter]: !seeMoreOfParameter?.[parameter],
    });
  };

  const parameters = [
    ...selectedParametersOrder,
    ...Object.keys(currentUser.parameters || {}).filter(
      (param) => !selectedParametersOrder.includes(param)
    ),
  ];

  return (
    <>
      {parameters.map((parameter: string, index: number) => (
        <div
          key={index}
          className={`flex flex-row gap-4 ${
            !selectedParametersOrder.includes(parameter) ? "opacity-40" : ""
          }`}
        >
          <div className="w-[4%] min-w-[4%]">X</div>
          <div className="w-[4%] min-w-[4%]">
            <input
              type="checkbox"
              name=""
              id=""
              checked={selectedParametersOrder.includes(parameter)}
              onChange={(e) => {
                if (e.target.checked) {
                  updateSelectedParametersOrder({ addParameter: parameter });
                } else {
                  updateSelectedParametersOrder({ removeParameter: parameter });
                }
              }}
              className="accent-white"
            />
          </div>
          <div className="w-[28%] min-w-[28%] text-base font-medium">
            {parameter}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
            <OptionsSection
              parameter={parameter}
              index={index}
              seeMoreOfParameter={seeMoreOfParameter?.[parameter]}
              toggleSeeMoreOfParameter={toggleSeeMoreOfParameter}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ParameterSelection;
