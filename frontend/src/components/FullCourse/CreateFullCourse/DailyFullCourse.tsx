import { useEffect, useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlaceCardListProps } from "../../../types/main";
import { getItemStyle, getListStyle } from "./dndFunction";
import PlaceCard from "./PlaceCard";

interface PlaceCardListDnd extends PlaceCardListProps {
  droppableId?: string;
  idx?: number;
  pickedDay?: number;
  nowScrollPosition?: number;
  setDayChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

function DailyFullCourse({
  placeList,
  droppableId = "droppablePlaceList",
  idx = 0,
  pickedDay = -1,
  nowScrollPosition = 0,
  setDayChange,
}: PlaceCardListDnd) {
  const dayText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("-------", nowScrollPosition);
    if (pickedDay === idx) {
      const scrollTarget = dayText.current?.offsetTop;
      if (!!scrollTarget) {
        dayText.current?.parentElement?.parentElement?.parentElement?.parentElement?.scrollTo(
          { top: scrollTarget, behavior: "auto" }
        );
      }
    }
    console.log(dayText.current?.offsetTop);
  }, []);

  return (
    <div>
      <div ref={dayText}>DAY{idx + 1}</div>
      <Droppable droppableId={droppableId}>
        {(provided: any, snapshot: any) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {!placeList ||
              placeList.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any, snapshot: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <PlaceCard
                        placeId={item.content.placeId}
                        category={item.content.category}
                        name={item.content.name}
                        thumbnail={item.content.thumbnail}
                        address={item.content.address}
                        averageScore={item.content.averageScore}
                        keywords={item.content.keywords}
                      ></PlaceCard>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default DailyFullCourse;
