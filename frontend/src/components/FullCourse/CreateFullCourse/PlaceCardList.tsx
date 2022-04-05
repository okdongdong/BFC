import { useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getPlaceListWithDistance } from "../../../redux/placeList/actions";
import { PlaceListInfoForGet } from "../../../redux/placeList/types";
import PlaceCard from "./PlaceCard";
import { PlaceCardProps } from "../../../types/main";
import { setFinished, addPage } from "../../../redux/schedule/actions";

interface PlaceCardListProps {
  title?: string;
  placeList: PlaceCardProps[];
  recommendDistance: number;
  selectedScheduleId: number;
  finished: boolean;
}
function PlaceCardList({
  selectedScheduleId,
  recommendDistance,
  getPlaceListWithDistance,
  placeList,
  page,
  finished,
  addPage,
}: Props & PlaceCardListProps) {
  const infiniteHandler = () => {
    const data = {
      distance: recommendDistance,
      scheduleId: selectedScheduleId,
      page: page,
      size: 8,
    };

    getPlaceListWithDistance(data);
  };

  const options = {
    root: null, // 기본 null, 관찰대상의 부모요소를 지정
    rootMargin: "20px", // 관찰하는 뷰포트의 마진 지정
    threshold: 1.0, // 관찰요소와 얼만큼 겹쳤을 때 콜백을 수행하도록 지정하는 요소 };
  };
  const interSectRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(async (entries) => {
    if (finished) {
      console.log("모든리스트를 조회했습니다.");
      return;
    }

    if (selectedScheduleId === 0) {
      console.log(selectedScheduleId);
      console.log("장소를 선택해주세요");
      return;
    }

    const target = entries[0];
    if (target.isIntersecting) {
      console.log("is InterSecting");
      addPage(1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (interSectRef.current !== null) {
      observer.observe(interSectRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    infiniteHandler();
  }, [page]);

  useEffect(() => {
    console.log(placeList);
  }, []);

  return (
    <div style={{ margin: 16 }}>
      {!placeList ||
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
        ))}
      {!finished || <div>끗</div>}
      <div style={{ height: 200, width: 1 }} ref={interSectRef}></div>
    </div>
  );
}
const mapStateToProps = ({ schedule }: any) => ({
  page: schedule.page,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPlaceListWithDistance: (placeListInfoForGet: PlaceListInfoForGet) =>
      dispatch(getPlaceListWithDistance(placeListInfoForGet)),
    addPage: (page: number) => dispatch(addPage(page)),
    setFinished: (finished: boolean) => dispatch(setFinished(finished)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardList);
