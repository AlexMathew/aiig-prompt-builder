import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
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

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const parameters = reorder(
      selectedParametersOrder,
      result.source.index,
      result.destination.index
    );

    updateSelectedParametersOrder({ updatedOrder: parameters });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="parameterDroppable">
          {(provided, snapshot) => {
            return (
              <div ref={provided.innerRef}>
                {parameters.map((parameter: string, index: number) => (
                  <Draggable
                    key={index}
                    draggableId={`draggable${index}`}
                    index={index}
                    isDragDisabled={
                      !selectedParametersOrder.includes(parameter)
                    }
                  >
                    {(provided, snapshot) => (
                      <div
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex flex-row gap-4 mb-2 ${
                          !selectedParametersOrder.includes(parameter)
                            ? "opacity-40"
                            : ""
                        }`}
                      >
                        <div className="w-[4%] min-w-[4%]">X</div>
                        <div className="w-[4%] min-w-[4%]">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={selectedParametersOrder.includes(
                              parameter
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateSelectedParametersOrder({
                                  addParameter: parameter,
                                });
                              } else {
                                updateSelectedParametersOrder({
                                  removeParameter: parameter,
                                });
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ParameterSelection;
