import { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  getPlaceList,
  getPlaceListWithDistance,
  getPlaceListWithSurvey,
  getSearchPlaceList,
} from "../../../redux/placeList/actions";
import {
  PlaceInfoForGet,
  PlaceListInfoForGet,
  PlaceSearchInfo,
  SurveyPlaceListInfoForGet,
} from "../../../redux/placeList/types";
import PlaceCard from "./PlaceCard";
import { PlaceCardProps } from "../../../types/main";
import { setFinished, addPage } from "../../../redux/schedule/actions";

interface PlaceCardListProps {
  title?: string;
  placeList: PlaceCardProps[];
  recommendDistance: number;
  selectedScheduleId: number;
  finished: boolean;
  nowFilterTypeIdx: number;
  placeName: string;
}
function PlaceCardList({
  selectedScheduleId,
  nowFilterTypeIdx,
  nowLoading,
  recommendDistance,
  placeName,
  getPlaceListWithDistance,
  getPlaceListWithSurvey,
  getSearchPlaceList,
  getPlaceList,
  placeList,
  page,
  userId,
  finished,
  addPage,
}: Props & PlaceCardListProps) {
  const infiniteHandler = () => {
    // 추천창 인피니티
    if (nowFilterTypeIdx === 0) {
      console.log("[fetch recommend]");
      const data: PlaceInfoForGet = {
        page: page,
        size: 8,
      };
      getPlaceList(data);
    }
    // 추천창 인피니티
    else if (nowFilterTypeIdx === 1) {
      console.log("[fetch recommend]");
      const data: PlaceListInfoForGet = {
        distance: recommendDistance,
        scheduleId: selectedScheduleId,
        page: page,
        size: 8,
      };
      getPlaceListWithDistance(data);

      // 설문기반 인피니티
    } else if (nowFilterTypeIdx === 2) {
      console.log("[fetch search] :", page);

      const data: SurveyPlaceListInfoForGet = {
        userId: userId,
        page: page,
        size: 8,
      };
      getPlaceListWithSurvey(data);

      // 검색창 인피니티
    } else if (nowFilterTypeIdx === 3) {
      console.log("[fetch search] :", page);

      const data: PlaceSearchInfo = {
        name: placeName,
        page: page,
        size: 8,
      };
      getSearchPlaceList(data);
    }
    addPage(1);
  };

  const options = {
    root: null, // 기본 null, 관찰대상의 부모요소를 지정
    rootMargin: "20px", // 관찰하는 뷰포트의 마진 지정
    threshold: 1.0, // 관찰요소와 얼만큼 겹쳤을 때 콜백을 수행하도록 지정하는 요소 };
  };
  const interSectRef = useRef<HTMLDivElement>(null);

  const handleObserver = async (entries: any) => {
    if (finished || nowLoading) {
      console.log("모든리스트를 조회||로딩중");
      return;
    }

    if (selectedScheduleId === 0 && nowFilterTypeIdx === 1) {
      console.log(selectedScheduleId);
      console.log("장소를 선택해주세요");
      return;
    }

    const target = entries[0];
    if (target.isIntersecting) {
      console.log("is InterSecting");
      infiniteHandler();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (interSectRef.current !== null) {
      observer.observe(interSectRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    console.log(placeList);
  }, []);

  return (
    <div style={{ margin: 16 }}>
      {!!placeList && placeList.length > 0 ? (
        placeList.map((item: any, index: any) => (
          <div key={item.id} style={{ margin: 8 }}>
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
        ))
      ) : (
        <div style={{ fontSize: 14, color: "grey" }}>검색결과가 없습니다.</div>
      )}
      {!finished || (
        <div style={{ fontSize: 14, color: "grey" }}>
          모든 결과를 출력했습니다.
        </div>
      )}
      {(nowFilterTypeIdx !== 1 && nowFilterTypeIdx !== 3) || (
        <div style={{ height: 100, width: 1 }} ref={interSectRef}></div>
      )}
    </div>
  );
}
const mapStateToProps = ({ schedule, baseInfo, account }: any) => ({
  page: schedule.page,
  nowLoading: baseInfo.nowLoading,
  userId: account.userId,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPlaceList: (placeInfoForGet: PlaceInfoForGet) =>
      dispatch(getPlaceList(placeInfoForGet)),
    getPlaceListWithDistance: (placeListInfoForGet: PlaceListInfoForGet) =>
      dispatch(getPlaceListWithDistance(placeListInfoForGet)),
    getPlaceListWithSurvey: (placeListInfoForGet: SurveyPlaceListInfoForGet) =>
      dispatch(getPlaceListWithSurvey(placeListInfoForGet)),
    getSearchPlaceList: (placeSearchInfo: PlaceSearchInfo) =>
      dispatch(getSearchPlaceList(placeSearchInfo)),
    addPage: (page: number) => dispatch(addPage(page)),
    setFinished: (finished: boolean) => dispatch(setFinished(finished)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardList);
