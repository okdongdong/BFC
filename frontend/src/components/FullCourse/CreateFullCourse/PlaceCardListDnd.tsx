import { styled } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { setSelectedPlaceId } from "../../../redux/placeDetail/actions";
import { PlaceCardListProps } from "../../../types/main";
import { getItemStyle, getListStyle } from "./dndFunction";
import PlaceCard from "./PlaceCard";

interface PlaceCardListDndProps extends PlaceCardListProps {
  droppableId?: string;
}

const CardStyle = styled("div")(() => ({
  width: 350,
  height: 132,
}));
function PlaceCardListDnd({
  placeList,
  droppableId = "placeList",
  setSelectedPlaceId,
}: PlaceCardListDndProps & Props) {
  const getRenderItem =
    (items: any) => (provided: any, snapshot: any, rubric: any) =>
      (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <PlaceCard
            placeId={items[rubric.source.index].content.placeId}
            category={items[rubric.source.index].content.category}
            name={items[rubric.source.index].content.name}
            thumbnail={items[rubric.source.index].content.thumbnail}
            address={items[rubric.source.index].content.address}
            averageScore={items[rubric.source.index].content.averageScore}
            keywords={items[rubric.source.index].content.keywords}
          ></PlaceCard>
        </div>
      );
  const items = placeList;
  const renderItem = getRenderItem(items);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        zIndex: 100,
        opacity: 0,
      }}
    >
      <Droppable
        droppableId={droppableId}
        renderClone={renderItem}
        isDropDisabled
      >
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
                      <CardStyle
                        onClick={() => {
                          setSelectedPlaceId(item.content.placeId);
                        }}
                      ></CardStyle>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedPlaceId: (placeId: number) =>
      dispatch(setSelectedPlaceId(placeId)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardListDnd);
