import PlaceCard from "./PlaceCard";
import { PlaceCardListProps } from "../../types/main";
import { Container, Grid, styled } from "@mui/material";

function PlaceCardList({ placeList, title }: PlaceCardListProps) {
  const TitleTextStyle = styled("h1")(() => ({
    fontSize: 32,
    marginBottom: 32,
    fontFamily: "Sunflower, sans-serif",
  }));

  return (
    <div>
      <TitleTextStyle>{title}</TitleTextStyle>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          {placeList.map((place, index) => (
            <Grid item xs={6} md={3}>
              <PlaceCard
                key={index}
                placeId={place.placeId}
                name={place.name}
                thumbnail={place.thumbnail}
                address={place.address}
                averageScore={place.averageScore}
                category={place.category}
                label={place.label}
              ></PlaceCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default PlaceCardList;
