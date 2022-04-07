import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import PlaceCardList from "../../components/Main/PlaceCardList";
import { customAxios } from "../../lib/customAxios";

const TitleTextStyle = styled("h1")(() => ({
  fontSize: 32,
  marginBottom: 32,
  fontFamily: "Sunflower, sans-serif",
}));

function RecommendList({ category }: { category: boolean }) {
  const [placeList, setPlaceList] = useState([]);

  const getRecommendList = async () => {
    const res = await customAxios({
      method: "get",
      url: `/place/${category ? "restaurant" : "attraction"}/recommend`,
    });

    setPlaceList(res.data);
  };

  useEffect(() => {
    getRecommendList();
  }, []);
  return (
    <div>
      <TitleTextStyle>추천 {category ? "맛집" : "관광지"}</TitleTextStyle>
      <PlaceCardList placeList={placeList}></PlaceCardList>
    </div>
  );
}

export default RecommendList;
