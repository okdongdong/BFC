import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlaceCardListProps } from "../../../types/main";
import { getItemStyle, getListStyle } from "./dndFunction";
import PlaceCard from "./PlaceCard";

interface PlaceCardListDnd extends PlaceCardListProps {
  droppableId?: string;
}

function PlaceCardList({
  placeList,
  droppableId = "droppablePlaceList",
}: PlaceCardListDnd) {
  return (
    <>
      검색창
      <hr />
      구분|구분|구분
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
    </>
  );
}

export default PlaceCardList;
