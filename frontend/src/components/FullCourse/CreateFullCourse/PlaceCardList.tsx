import { PlaceCardListProps } from "../../../types/main";
import PlaceCard from "./PlaceCard";

function PlaceCardList({ placeList }: PlaceCardListProps) {
  return (
    <div style={{ margin: 8 }}>
      검색창
      <hr />
      구분|구분|구분
      <div>
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
      </div>
    </div>
  );
}

export default PlaceCardList;
