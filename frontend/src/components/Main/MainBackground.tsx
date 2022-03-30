import { styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import background3 from "../../assets/img/background3.png";
import background5 from "../../assets/img/background5.jpg";
import background6 from "../../assets/img/background6.jpg";
import background8 from "../../assets/img/background8.jpg";

function MainBackgroundPart({ background }: any) {
  const MainBackgroundContainerStyle = styled("div")(({ theme }) => ({
    width: "100%",
    height: 450,
  }));

  const MainBackgroundStyle = styled("img")({
    width: "100%",
  });
  return (
    <MainBackgroundContainerStyle>
      <MainBackgroundStyle src={background} alt="background" />
    </MainBackgroundContainerStyle>
  );
}

function MainBackgroundCarousel() {
  return (
    <Carousel>
      <MainBackgroundPart background={background3}></MainBackgroundPart>
      <MainBackgroundPart background={background5}></MainBackgroundPart>
      <MainBackgroundPart background={background6}></MainBackgroundPart>
      <MainBackgroundPart background={background8}></MainBackgroundPart>
    </Carousel>
  );
}
export default MainBackgroundCarousel;
