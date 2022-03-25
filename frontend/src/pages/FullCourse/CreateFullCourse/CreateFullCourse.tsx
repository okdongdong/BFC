import { Stack } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import CollapseContainer from "../../../components/FullCourse/CreateFullCourse/CollapseContainer";
import DailyFullCourse from "../../../components/FullCourse/CreateFullCourse/DailyFullCourse";
import DayBar from "../../../components/FullCourse/CreateFullCourse/DayBar";
import {
  move,
  reorder,
} from "../../../components/FullCourse/CreateFullCourse/dndFunction";
import KakaoMap from "../../../components/FullCourse/CreateFullCourse/KakaoMap";
import PlaceCardList from "../../../components/FullCourse/CreateFullCourse/PlaceCardList";
import PlaceDetail from "../../../components/FullCourse/CreateFullCourse/PlaceDetail";
import PlaceSearch from "../../../components/FullCourse/CreateFullCourse/PlaceSearch";
import { moveCard } from "../../../redux/createFullCourse/actions";
import { CreateFullCourseDnd } from "../../../redux/createFullCourse/reducer";
import { CreateFullCourseReducer } from "../../../redux/rootReducer";

function CreateFullCourse({ fullCourseList, placeList, moveCard }: Props) {
  let state: any = {
    fullCourseList: [...fullCourseList],
    placeList: [...placeList],
  };

  const id2List: any = {
    droppableFullCourseList: "fullCourseList",
    droppablePlaceList: "placeList",
  };

  const getList = (id: string) => state[id2List[id]];

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // 같은 리스트 안에서 이동하는 경우
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "droppableFullCourseList") {
        state["fullCourseList"] = items;
      } else {
        state["placeList"] = items;
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      state = {
        fullCourseList: result.droppableFullCourseList,
        placeList: result.droppablePlaceList,
      };
    }

    moveCard(state);
  };
  return (
    <div style={{ width: "100%" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <DailyFullCourse></DailyFullCourse>
        {/* <DayBar></DayBar> */}
        <PlaceDetail></PlaceDetail>
        <PlaceSearch></PlaceSearch>
        <div style={{ display: "flex" }}>
          <CollapseContainer buttonPositionY={0}>
            풀코스
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <PlaceCardList
                placeList={fullCourseList}
                droppableId="droppableFullCourseList"
              ></PlaceCardList>
            </Stack>
          </CollapseContainer>
          <CollapseContainer buttonPositionY={200} backgroundColor="#dee">
            검색창
            <hr />
            구분|구분|구분
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <PlaceCardList placeList={placeList}></PlaceCardList>
            </Stack>
          </CollapseContainer>
          <CollapseContainer buttonPositionY={400} backgroundColor="#cdd">
            디테일
          </CollapseContainer>
          {/* <KakaoMap></KakaoMap> */}
          <DailyFullCourse></DailyFullCourse>
        </div>
      </DragDropContext>
    </div>
  );
}
const mapStateToProps = ({ createFullCourse }: any) => {
  return {
    fullCourseList: createFullCourse.fullCourseList,
    placeList: createFullCourse.placeList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    moveCard: (newState: CreateFullCourseDnd) => dispatch(moveCard(newState)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CreateFullCourse);
