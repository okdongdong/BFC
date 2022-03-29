import { Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { placeList as dummyPlaceList } from "../../assets/dummyData/dummyData";
import CollapseContainer from "../../components/FullCourse/CreateFullCourse/CollapseContainer";
import DailyFullCourse from "../../components/FullCourse/CreateFullCourse/DailyFullCourse";
import DayBar from "../../components/FullCourse/CreateFullCourse/DayBar";
import { reorder } from "../../components/FullCourse/CreateFullCourse/dndFunction";
import KakaoMap from "../../components/FullCourse/CreateFullCourse/KakaoMap";
import PlaceCardList from "../../components/FullCourse/CreateFullCourse/PlaceCardList";
import PlaceCardListDnd from "../../components/FullCourse/CreateFullCourse/PlaceCardListDnd";
import PlaceDetail from "../../components/FullCourse/CreateFullCourse/PlaceDetail";
import PlaceSearch from "../../components/FullCourse/CreateFullCourse/PlaceSearch";
import { moveCard } from "../../redux/createFullCourse/actions";
import { CreateFullCourseDnd } from "../../redux/createFullCourse/createFullCourseReducer";

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
  const [removed]: any = sourceClone.splice(droppableSource.index, 1);
  const removedClone = { ...removed };
  if (droppableSource.dropableId !== "placeList") {
    removedClone.id = `${removed.id}-${new Date().getTime()}`;
  }
  destClone.splice(droppableDestination.index, 0, removedClone);

  const result: any = {};
  if (droppableSource.dropableId !== "placeList") {
    result[droppableSource.droppableId] = sourceClone;
  }
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
  plt2.push({
    id: `place2-${place.placeId}-${new Date().getTime()}`,
    content: place,
  })
);

function CreateFullCourse({ fullCourseList, placeList, moveCard }: Props) {
  const [pickedDay, setPickedDay] = useState<number>(1);
  const [nowScrollPosition, setNowScrollPosition] = useState<number>(0);
  const [dayChange, setDayChange] = useState<boolean>(false);
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination || destination.dropableId === "placeList") {
      return;
    }
    console.log(111111111, source);
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (source.droppableId === "placeList") {
      const result = move(placeList, fullCourseList[dInd], source, destination);
      const newState: any = [...fullCourseList];
      newState[dInd] = result[dInd];
      moveCard(newState);
      // 스케줄 추가 구현중
      // creatNewSchedule({...placeList[source.index], day:dInd+1, sequence:destination.index+1});

      return;
    }

    if (sInd === dInd) {
      if (source.index === destination.index) {
        return;
      }

      const items = reorder(
        fullCourseList[sInd],
        source.index,
        destination.index
      );
      const newState: any = [...fullCourseList];
      newState[sInd] = items;
      moveCard(newState);
    } else {
      const result = move(
        fullCourseList[sInd],
        fullCourseList[dInd],
        source,
        destination
      );
      const newState: any = [...fullCourseList];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      moveCard(newState);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <DayBar></DayBar> */}
        <PlaceDetail></PlaceDetail>
        <PlaceSearch></PlaceSearch>
        <div style={{ display: "flex", position: "relative" }}>
          <DayBar
            pickedDay={pickedDay}
            setPickedDay={setPickedDay}
            setDayChange={setDayChange}
          ></DayBar>
          <CollapseContainer
            dayChange={dayChange}
            buttonPositionY={0}
            setNowScrollPosition={setNowScrollPosition}
          >
            풀코스
            <Stack
              spacing={2}
              sx={{ alignItems: "center", position: "relative" }}
            >
              {fullCourseList.map((placeList: any, idx: number) => (
                <div key={idx}>
                  <div>DAY{idx + 1}</div>
                  <DailyFullCourse
                    setDayChange={setDayChange}
                    nowScrollPosition={nowScrollPosition}
                    idx={idx}
                    pickedDay={pickedDay}
                    placeList={placeList}
                    droppableId={`${idx}`}
                  ></DailyFullCourse>
                </div>
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
          <KakaoMap></KakaoMap>
        </div>
      </DragDropContext>
    </div>
  );
}
const mapStateToProps = ({ createFullCourse, createPlaceList }: any) => ({
  fullCourseList: createFullCourse.fullCourseList,
  placeList: createPlaceList.placeList,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    moveCard: (newState: Array<CreateFullCourseDnd>) =>
      dispatch(moveCard(newState)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CreateFullCourse);
