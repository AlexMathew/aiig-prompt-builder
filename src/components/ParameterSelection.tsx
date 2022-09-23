import React, { useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import OptionsSection from "./OptionsSection";

interface ParameterSelectionProps {}

const ParameterSelection: React.FC<ParameterSelectionProps> = () => {
  const [seeMoreOfParameter, setSeeMoreOfParameter] = useState<{
    [parameter: string]: boolean;
  }>({});
  const currentUser = useCurrentUser();

  const toggleSeeMoreOfParameter = (parameter: string) => {
    setSeeMoreOfParameter({
      ...seeMoreOfParameter,
      [parameter]: !seeMoreOfParameter?.[parameter],
    });
  };

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
              <OptionsSection
                parameter={parameter}
                index={index}
                seeMoreOfParameter={seeMoreOfParameter?.[parameter]}
                toggleSeeMoreOfParameter={toggleSeeMoreOfParameter}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ParameterSelection;
