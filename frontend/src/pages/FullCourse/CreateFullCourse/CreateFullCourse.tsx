import { Stack } from "@mui/material";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { placeList as dummyPlaceList } from "../../../assets/dummyData/dummyData";
import CollapseContainer from "../../../components/FullCourse/CreateFullCourse/CollapseContainer";
import DailyFullCourse from "../../../components/FullCourse/CreateFullCourse/DailyFullCourse";
import DayBar from "../../../components/FullCourse/CreateFullCourse/DayBar";
import { reorder } from "../../../components/FullCourse/CreateFullCourse/dndFunction";
import KakaoMap from "../../../components/FullCourse/CreateFullCourse/KakaoMap";
import PlaceCardList from "../../../components/FullCourse/CreateFullCourse/PlaceCardList";
import PlaceCardListDnd from "../../../components/FullCourse/CreateFullCourse/PlaceCardListDnd";
import PlaceDetail from "../../../components/FullCourse/CreateFullCourse/PlaceDetail";
import PlaceSearch from "../../../components/FullCourse/CreateFullCourse/PlaceSearch";
import { moveCard } from "../../../redux/createFullCourse/actions";
import { CreateFullCourseDnd } from "../../../redux/createFullCourse/createFullCourseReducer";
import { CreateFullCourseReducer } from "../../../redux/rootReducer";

const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const createNewItem = () => {
  const plt: any = [];
  dummyPlaceList.map((place: any) =>
    plt.push({
      id: `place-${place.placeId}-${new Date().getTime()}`,
      content: place,
    })
  );
  return plt;
};
const plt2: any = [];
dummyPlaceList.map((place: any) =>
  plt2.push({ id: `place2-${place.placeId}`, content: place })
);

function CreateFullCourse() {
  const [state, setState] = useState([[...plt2], createNewItem()]);

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState: any = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }
  return (
    <div style={{ width: "100%" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <DayBar></DayBar> */}
        <PlaceDetail></PlaceDetail>
        <PlaceSearch></PlaceSearch>
        <div style={{ display: "flex", position: "relative" }}>
          <DayBar></DayBar>
          <CollapseContainer buttonPositionY={0}>
            풀코스
            <Stack
              spacing={2}
              sx={{ alignItems: "center", position: "relative" }}
            >
              {state.map((el, idx) => (
                <DailyFullCourse
                  key={idx}
                  placeList={el}
                  droppableId={`${idx}`}
                ></DailyFullCourse>
              ))}
            </Stack>
          </CollapseContainer>
          <CollapseContainer buttonPositionY={200} backgroundColor="#dee">
            검색창
            <hr />
            구분|구분|구분
            <Stack
              spacing={2}
              sx={{ alignItems: "center", position: "relative" }}
            >
              <PlaceCardList placeList={createNewItem()}></PlaceCardList>
              <PlaceCardListDnd placeList={createNewItem()}></PlaceCardListDnd>
            </Stack>
          </CollapseContainer>
          <CollapseContainer buttonPositionY={400} backgroundColor="#cdd">
            디테일
          </CollapseContainer>
          {/* <KakaoMap></KakaoMap> */}
        </div>
      </DragDropContext>
    </div>
  );
}

export default CreateFullCourse;


