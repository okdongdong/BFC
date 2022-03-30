import { Stack } from "@mui/material";
import FullCourseCardList from "../../components/Main/FullCourseCardList";
import MainBackground from "../../components/Main/MainBackground";
import MyFullCourse from "../../components/Main/MyFullCourse/MyFullCourse";
import PlaceCardList from "../../components/Main/PlaceCardList";
import { connect } from "react-redux";
import { AccountReducer } from "../../redux/rootReducer";
import {
  fullCourseDetailList,
  fullCourseList,
  placeList,
} from "../../assets/dummyData/dummyData";

function Main({ isLogin }: Props) {
  return (
    <Stack spacing={10}>
      {isLogin ? (
        <MyFullCourse
          fullCourseDetailList={fullCourseDetailList}
        ></MyFullCourse>
      ) : (
        <MainBackground></MainBackground>
      )}
      <FullCourseCardList
        fullCourseList={fullCourseList}
        title="인기 풀코스"
      ></FullCourseCardList>
      <PlaceCardList placeList={placeList} title="관광지"></PlaceCardList>
      <PlaceCardList placeList={placeList} title="맛집"></PlaceCardList>
    </Stack>
  );
}

const mapStateToProps = ({ account }: AccountReducer) => ({
  isLogin: account.isLogin,
});

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Main);
