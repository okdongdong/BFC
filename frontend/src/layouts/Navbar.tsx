import { alpha, AppBar, Box, styled, Toolbar } from "@mui/material";
import Logo from "../components/logo";
import NavbarText from "../components/navbarText";

// 헤더 화면 (상단 메뉴바)

const Navbar = () => {
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;

  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    backgroundColor: alpha(theme.palette.background.default, 0.72),
  }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up("lg")]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />
        <Logo />
        <NavbarText to="/attraction" text="여행지"></NavbarText>
        <NavbarText to="/restaurant" text="맛집"></NavbarText>
        <NavbarText to="/info" text="이용방법"></NavbarText>
        <Box sx={{ flexGrow: 1 }} />
        <NavbarText to="/signup" text="회원가입"></NavbarText>
        <NavbarText to="/login" text="로그인"></NavbarText>
        <Box sx={{ flexGrow: 1 }} />
      </ToolbarStyle>
    </RootStyle>
  );
};

export default Navbar;
