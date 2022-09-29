import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";
import { useCurrentUser } from "../context/CurrentUserContext";
import {
  useParameterSelection,
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
  const promptParameters = useParameterSelection();
  const selectedParametersOrder = useSelectedParametersOrder();
  const updateSelectedParametersOrder = useSelectedParametersOrderUpdate();

  const toggleSeeMoreOfParameter = (parameter: string) => {
    setSeeMoreOfParameter({
      ...seeMoreOfParameter,
      [parameter]: !seeMoreOfParameter?.[parameter],
    });
  };

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

  useEffect(() => {
    const parameters = Object.keys(currentUser?.parameters || {});

    updateSelectedParametersOrder({ updatedOrder: parameters });
  }, [currentUser.parameters]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="parameterDroppable">
          {(provided, snapshot) => {
            return (
              <div ref={provided.innerRef}>
                {selectedParametersOrder.map(
                  (parameter: string, index: number) => {
                    const isSelected = !!promptParameters?.[parameter];
                    return (
                      <Draggable
                        key={index}
                        draggableId={`draggable${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex flex-row gap-4 mb-2"
                          >
                            <div
                              className="w-[5%] min-w-[5%]"
                              {...provided.dragHandleProps}
                            >
                              <MdDragIndicator className="text-xl sm:text-2xl" />
                            </div>
                            <div
                              className={`w-[30%] min-w-[30%] text-base font-medium ${
                                isSelected ? "text-[#FD6585]" : ""
                              }`}
                            >
                              {parameter}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                              <OptionsSection
                                parameter={parameter}
                                index={index}
                                seeMoreOfParameter={
                                  seeMoreOfParameter?.[parameter]
                                }
                                toggleSeeMoreOfParameter={
                                  toggleSeeMoreOfParameter
                                }
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                )}
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
