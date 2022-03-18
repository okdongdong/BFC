import { alpha, AppBar, Box, styled, Toolbar } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

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
        <Box sx={{ px: 2.5, py: 3 }}>
          <RouterLink to="/">aaa</RouterLink>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <RouterLink to="/items">구매하기</RouterLink>
        <RouterLink to="/register">등록하기</RouterLink>
        <RouterLink to="/whosart">후즈컬렉션</RouterLink>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default Navbar;
