import { Backdrop, Stack, CircularProgress } from "@mui/material";
import FullCourseCardList from "../../components/Main/FullCourseCardList";
import MainBackground from "../../components/Main/MainBackgroundCarousel";
import MyFullCourse from "../../components/Main/MyFullCourse/MyFullCourse";
import PlaceCardList from "../../components/Main/PlaceCardList";
import { connect } from "react-redux";
import { AccountReducer } from "../../redux/rootReducer";
import { fullCourseDetailList } from "../../assets/dummyData/dummyData";
import { customAxios } from "../../lib/customAxios";
import { useEffect, useState } from "react";
import { errorControl, loadingControl } from "../../redux/baseInfo/actions";
import Notice from "../../components/FullCourse/CreateFullCourse/Notice";

function Main({
  isLogin,
  userId,
  nowLoading,
  errorControl,
  loadingControl,
}: Props) {
  const [attrationList, setAttrationList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [popularFullCourseList, setPopularFullCourseList] = useState([]);
  const [myFullCourseList, setMyFullCourseList] = useState([]);

  const getRestaurantRecommend = async () => {
    loadingControl(true);
    try {
      const res = await customAxios({
        method: "get",
        url: `place/restaurant/${isLogin ? "mainRecommend" : "popular"}`,
      });
      console.log("음식데이터", res);
      setRestaurantList(res.data);
    } catch (e) {
      console.log(e);
      errorControl("음식점 정보를 불러오는데 실패했습니다.");
    }
    loadingControl(false);
  };

  const getAttrationRecommend = async () => {
    loadingControl(true);
    try {
      const res = await customAxios({
        method: "get",
        url: `place/attraction/${isLogin ? "mainRecommend" : "popular"}`,
      });
      console.log("관광데이터", res);
      setAttrationList(res.data);
    } catch (e) {
      console.log(e);
      errorControl("관광지 정보를 불러오는데 실패했습니다.");
    }
    loadingControl(false);
  };

  const getPopularFullCourse = async () => {
    loadingControl(true);
    try {
      const res = await customAxios({
        method: "get",
        url: "fullCourse/popular",
      });
      console.log("추천풀코스데이터", res);
      setPopularFullCourseList(res.data);
    } catch (e) {
      console.log(e);
      errorControl("풀코스 정보를 불러오는데 실패했습니다.");
    }
    loadingControl(false);
  };

  const getMyFullCourse = async () => {
    loadingControl(true);
    try {
      const res = await customAxios({
        method: "get",
        url: `/users/${userId}/userFullCourse`,
        params: {
          page: 0,
          size: 4,
        },
      });
      console.log("내풀코스데이터", res);
      setMyFullCourseList(res.data.content);
    } catch (e) {
      console.log(e);
    }
    loadingControl(false);
  };

  const getInfo = () => {
    getRestaurantRecommend();
    getAttrationRecommend();
    getPopularFullCourse();
    if (isLogin) {
      console.log("내풀코스 내놔라");
      getMyFullCourse();
    }
  };

  useEffect(() => {
    console.log("-----");
    getInfo();
  }, []);

  return (
    <>
      <Notice></Notice>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={nowLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack spacing={10}>
        {isLogin && myFullCourseList.length > 0 ? (
          <MyFullCourse fullCourseDetailList={myFullCourseList}></MyFullCourse>
        ) : (
          <MainBackground></MainBackground>
        )}
        <FullCourseCardList
          fullCourseList={popularFullCourseList}
          title="인기 풀코스"
        ></FullCourseCardList>
        <PlaceCardList placeList={attrationList} title="관광지"></PlaceCardList>
        <PlaceCardList placeList={restaurantList} title="맛집"></PlaceCardList>
      </Stack>
    </>
  );
}

const mapStateToProps = ({ account, baseInfo }: AccountReducer) => ({
  isLogin: account.isLogin,
  userId: account.userId,

  nowLoading: baseInfo.nowLoading,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    errorControl: (errMessage: string) => errorControl(dispatch, errMessage),
    loadingControl: (nowLoading: boolean) =>
      loadingControl(dispatch, nowLoading),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Main);
