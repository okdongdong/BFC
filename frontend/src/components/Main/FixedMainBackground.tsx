import { styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import background3 from "../../assets/img/background3.png";
import background5 from "../../assets/img/background5.jpg";
import background6 from "../../assets/img/background6.jpg";
import background8 from "../../assets/img/background8.jpg";

export function MainBackgroundPart({ background }: any) {
  const MainBackgroundContainerStyle = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
  }));

  const MainBackgroundStyle = styled("img")({
    width: "100%",
    height: "100%",
  });
  return (
    <MainBackgroundContainerStyle>
      <MainBackgroundStyle src={background} alt="background" />
    </MainBackgroundContainerStyle>
  );
}

function FixedMainBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        zIndex: 0,
        width: "100%",
        height: "100%",
        filter: "brightness(60%)",
      }}
    >
      <Carousel swipe={false} indicators={false} sx={{ height: "100%" }}>
        <MainBackgroundPart background={background3}></MainBackgroundPart>
        <MainBackgroundPart background={background5}></MainBackgroundPart>
        <MainBackgroundPart background={background6}></MainBackgroundPart>
        <MainBackgroundPart background={background8}></MainBackgroundPart>
      </Carousel>
    </div>
  );
}
export default FixedMainBackground;
