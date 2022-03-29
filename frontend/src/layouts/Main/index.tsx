import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const MainLayout = () => {
  // const APP_BAR_MOBILE = 64;
  // const APP_BAR_DESKTOP = 92;

  const RootStyle = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
  });

  const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    marginTop: 108,
  }));

  return (
    <RootStyle>
      <Navbar />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

export default MainLayout;
