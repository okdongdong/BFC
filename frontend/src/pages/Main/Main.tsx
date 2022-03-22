import FullCourseCardList from "../../components/Main/FullCourseCardList";
import MainBackground from "../../components/Main/MainBackground";
import PlaceCardList from "../../components/Main/PlaceCardList";

function Main() {
  // 더미데이터
  const fullCourseList = [
    {
      fullCourseId: 254,
      title: "마이 풀코스",
      thumbnailList: [
        "https://img.huffingtonpost.com/asset/5b3d67181a00002700ce358a.jpeg?cache=EOIukoBNd9&ops=1200_630",
        "https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07",
      ],
      startOn: new Date("2022-03-17"),
      finishedOn: new Date("2022-03-22"),
      views: 2541234,
    },
    {
      fullCourseId: 254,
      title: "마이 풀코스",
      thumbnailList: [
        "https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07",
        "https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg",
        "https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07",
      ],
      startOn: new Date("2022-02-28"),
      finishedOn: new Date("2022-03-22"),
      views: 2541234,
    },
    {
      fullCourseId: 254,
      title: "마이 풀코스",
      thumbnailList: [
        "https://img.huffingtonpost.com/asset/5b3d67181a00002700ce358a.jpeg?cache=EOIukoBNd9&ops=1200_630",
        "https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07",
      ],
      startOn: new Date("2022-03-17"),
      finishedOn: new Date("2022-03-22"),
      views: 2541234,
    },
    {
      fullCourseId: 254,
      title: "마이 풀코스",
      thumbnailList: [
        "https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07",
        "https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg",
        "https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07",
      ],
      startOn: new Date("2022-02-28"),
      finishedOn: new Date("2022-03-22"),
      views: 2541234,
    },
  ];

  const placeList = [
    {
      placeId: 123,
      name: "관광지",
      thumbnail: "https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07",
      address: "부산광역시 금정구 장전동",
      averageScore: 3.2,
      category: 0,
      keywords: [
        "국밥",
        "소주",
        "국밥",
        "소주",
        "국밥",
        "소주",
        "국밥",
        "소주",
      ],
    },
    {
      placeId: 124,
      name: "다른 관광지",
      thumbnail:
        "https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg",
      address: "부산광역시 금정구 장전동",
      averageScore: 3.2,
      category: 0,
      keywords: [
        "국밥",
        "소주",
        "국밥",
        "소주",
        "국밥",
        "소주",
        "국밥",
        "소주",
      ],
    },
    {
      placeId: 123,
      name: "관광지",
      thumbnail: "https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07",
      address: "부산광역시 금정구 장전동",
      averageScore: 3.2,
      category: 0,
      keywords: [
        "국밥",
        "소주",
        "국밥",
        "소주",
        "국밥",
        "소주",
        "국밥",
        "소주",
      ],
    },
    {
      placeId: 124,
      name: "다른 관광지",
      thumbnail:
        "https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg",
      address: "부산광역시 금정구 장전동",
      averageScore: 3.2,
      category: 0,
      keywords: [
        "국밥",
        "소주",
        "국밥",
        "소주",
        "국밥",
        "소주",
        "국밥",
        "소주",
      ],
    },
  ];

  return (
    <div>
      <MainBackground></MainBackground>
      <FullCourseCardList
        fullCourseList={fullCourseList}
        title="인기 풀코스"
      ></FullCourseCardList>
      <PlaceCardList placeList={placeList} title="관광지"></PlaceCardList>
      <PlaceCardList placeList={placeList} title="맛집"></PlaceCardList>
    </div>
  );
}
export default Main;
