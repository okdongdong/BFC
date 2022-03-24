import PlaceCard from "./PlaceCard";
import { PlaceCardListProps } from "../../types/main";
import { styled } from "@mui/material";

function PlaceCardList({ placeList, title }: PlaceCardListProps) {
  const TitleTextStyle = styled("h1")(() => ({
    fontSize: 32,
    marginBottom: 32,
  }));

  const PlaceCardListStyle = styled("div")(() => ({
    justifyContent: "center",
    display: "flex",
  }));

  return (
    <div>
      <TitleTextStyle>{title}</TitleTextStyle>
      <PlaceCardListStyle>
        {placeList.map((place) => (
          <PlaceCard
            placeId={place.placeId}
            name={place.name}
            thumbnail={place.thumbnail}
            address={place.address}
            averageScore={place.averageScore}
            category={place.category}
            keywords={place.keywords}
          ></PlaceCard>
        ))}
      </PlaceCardListStyle>
    </div>
  );
}
export default PlaceCardList;
