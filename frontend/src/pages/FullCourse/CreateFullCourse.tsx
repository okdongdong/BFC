import { Backdrop, Button, CircularProgress, Stack } from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { placeCardList as dummy } from "../../assets/dummyData/dummyData";
import AddCustomPlaceModal from "../../components/FullCourse/CreateFullCourse/AddCustomPlaceModal";
import CollapseContainer from "../../components/FullCourse/CreateFullCourse/CollapseContainer";
import DailyFullCourse from "../../components/FullCourse/CreateFullCourse/DailyFullCourse";
import DayBar from "../../components/FullCourse/CreateFullCourse/DayBar";
import { reorder } from "../../components/FullCourse/CreateFullCourse/dndFunction";
import FullCourseHeader from "../../components/FullCourse/CreateFullCourse/FullCourseHeader";
import FullCourseKakaoMap from "../../components/FullCourse/CreateFullCourse/FullCourseKakaoMap";
import Notice from "../../components/FullCourse/CreateFullCourse/Notice";
import PlaceCardList from "../../components/FullCourse/CreateFullCourse/PlaceCardList";
import PlaceCardListDnd from "../../components/FullCourse/CreateFullCourse/PlaceCardListDnd";
import PlaceDetail from "../../components/FullCourse/CreateFullCourse/PlaceDetail";
import PlaceHeader from "../../components/FullCourse/CreateFullCourse/PlaceHeader";
import PlaceSearch from "../../components/FullCourse/CreateFullCourse/PlaceSearch";
import {
  createNewSchedule,
  deleteSchedule,
  moveCard,
  updateSchedule,
} from "../../redux/createFullCourse/actions";
import {
  CreateNewScheduleProps,
  DeleteScheduleProps,
  FullCourseListProps,
  UpdateScheduleProps,
} from "../../redux/createFullCourse/types";

const MapContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  position: "fixed",
  backgroundColor: "#cdcdcd",
});

// 카드를 이동하는 함수
export const move = (
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

// 풀코스 생성페이지
function CreateFullCourse({
  fullCourseList,
  fullCourseId,
  placeList,
  nowLoading,
  moveCard,
  createNewSchedule,
  updateSchedule,
  deleteSchedule,
}: Props) {
  const [pickedDay, setPickedDay] = useState<number>(1);
  const [nowScrollPosition, setNowScrollPosition] = useState<number>(0);
  const [dayChange, setDayChange] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [nowPage, setNowPage] = useState<number>(0);
  const SIZE = 8;

  // 탭을 여닫는 변수
  const [expandedFullCourse, setExpandedFullCourse] = useState(true);
  const [expandedPlace, setExpandedPlace] = useState(true);
  const [expandedPlaceDetail, setExpandedPlaceDetail] = useState(true);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    // 리스트 바깥이나 place영역에 카드를 놓았을 때
    if (!destination || destination.dropableId === "placeList") {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (source.droppableId === "placeList") {
      const result = move(placeList, fullCourseList[dInd], source, destination);
      const newState: FullCourseListProps = [...fullCourseList];
      newState[dInd] = result[dInd];
      createNewSchedule({
        newScheduleListInfo: newState,
        day: dInd,
        sequence: destination.index,
        fullCourseId: fullCourseId,
      });

      return;
    }

    const scheduleId = fullCourseList[sInd][source.index].content.scheduleId;
    const placeId = fullCourseList[sInd][source.index].content.placeId;

    if (sInd === dInd) {
      if (source.index === destination.index) {
        // 같은칸, 같은위치로 움직이는 경우
        return;
      }

      // 같은 칸 내부에서 움직이는 경우
      const items = reorder(
        fullCourseList[sInd],
        source.index,
        destination.index
      );
      const newState: any = [...fullCourseList];
      newState[sInd] = items;
      updateSchedule({
        placeId: placeId,
        updateScheduleListInfo: newState,
        fullCourseId: fullCourseId,
        scheduleId: scheduleId,
        day: sInd,
        day2: dInd,
        sequence: source.index,
        sequence2: destination.index,
      });
    } else {
      // 다른 칸으로 움직이는 경우
      const result = move(
        fullCourseList[sInd],
        fullCourseList[dInd],
        source,
        destination
      );
      const newState: any = [...fullCourseList];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      updateSchedule({
        placeId: placeId,
        updateScheduleListInfo: newState,
        fullCourseId: fullCourseId,
        scheduleId: scheduleId,
        day: sInd,
        day2: dInd,
        sequence: source.index,
        sequence2: destination.index,
      });
    }
  };

  return (
    <>
      <Notice></Notice>
      <div style={{ width: "100%" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={nowLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <AddCustomPlaceModal
          openModal={openModal}
          setOpenModal={setOpenModal}
        ></AddCustomPlaceModal>
        <DragDropContext onDragEnd={onDragEnd}>
          <PlaceDetail></PlaceDetail>
          <PlaceSearch></PlaceSearch>
          <div style={{ display: "flex", position: "relative" }}>
            <MapContainer>
              <FullCourseKakaoMap
                expandedFullCourse={expandedFullCourse}
                expandedPlace={expandedPlace}
                expandedPlaceDetail={expandedPlaceDetail}
                pickedDay={pickedDay}
              ></FullCourseKakaoMap>
            </MapContainer>
            <DayBar
              pickedDay={pickedDay}
              setPickedDay={setPickedDay}
              setDayChange={setDayChange}
            ></DayBar>
            <CollapseContainer
              expanded={expandedFullCourse}
              setExpanded={setExpandedFullCourse}
              dayChange={dayChange}
              buttonPositionY={0}
              setNowScrollPosition={setNowScrollPosition}
            >
              <FullCourseHeader setOpenModal={setOpenModal}></FullCourseHeader>

              <Stack
                spacing={2}
                sx={{ alignItems: "center", position: "relative" }}
              >
                {fullCourseList.map((placeList: any, idx: number) => (
                  <div key={idx}>
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
            <CollapseContainer
              expanded={expandedPlace}
              setExpanded={setExpandedPlace}
              buttonPositionY={150}
              backgroundColor="#dee"
            >
              <PlaceHeader
                nowPage={nowPage}
                setNowPage={setNowPage}
                SIZE={SIZE}
              ></PlaceHeader>
              <Stack
                spacing={2}
                sx={{ alignItems: "center", position: "relative" }}
              >
                <PlaceCardList placeList={dummy}></PlaceCardList>
                <PlaceCardListDnd placeList={dummy}></PlaceCardListDnd>
              </Stack>
            </CollapseContainer>
            <CollapseContainer
              expanded={expandedPlaceDetail}
              setExpanded={setExpandedPlaceDetail}
              buttonPositionY={300}
              backgroundColor="#cdd"
            >
              디테일
            </CollapseContainer>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
const mapStateToProps = ({
  createFullCourse,
  placeListReducer,
  baseInfo,
}: any) => ({
  fullCourseList: createFullCourse.fullCourseList,
  placeList: placeListReducer.placeList,
  fullCourseId: createFullCourse.fullCourseId,
  nowLoading: baseInfo.nowLoading,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    moveCard: (newState: FullCourseListProps) => dispatch(moveCard(newState)),
    createNewSchedule: (newState: CreateNewScheduleProps) =>
      dispatch(createNewSchedule(newState)),
    updateSchedule: (newState: UpdateScheduleProps) =>
      dispatch(updateSchedule(newState)),
    deleteSchedule: (newState: DeleteScheduleProps) =>
      dispatch(deleteSchedule(newState)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CreateFullCourse);
