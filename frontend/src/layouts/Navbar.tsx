import { alpha, AppBar, Box, styled, Toolbar } from "@mui/material";
import { connect } from "react-redux";
import { AccountReducer } from "../redux/rootReducer";
import Logo from "../components/Navbar/Logo";
import NavbarText from "../components/Navbar/NavbarText";

// 헤더 화면 (상단 메뉴바)
const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: 108,
  padding: "0px !important",
  letterSpacing: "0px",
  width: "100%",
}));

const Navbar = ({ isLogin, nickname, profileImg }: Props) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />
        <Logo />
        <NavbarText to="attraction" text="여행지"></NavbarText>
        <NavbarText to="restaurant" text="맛집"></NavbarText>
        <NavbarText to="info" text="이용방법"></NavbarText>
        <Box sx={{ flexGrow: 2 }} />

        {isLogin ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <img
                src={profileImg}
                alt="profileImg"
                style={{ width: 64, height: 64, borderRadius: "50%" }}
              />
            </Box>
            <NavbarText to="profile" text={nickname}></NavbarText>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <NavbarText to="signup" text="회원가입"></NavbarText>
            <NavbarText to="login" text="로그인"></NavbarText>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
      </ToolbarStyle>
    </RootStyle>
  );
};

const mapStateToProps = ({ account }: AccountReducer) => ({
  isLogin: account.isLogin,
  nickname: account.nickname,
  profileImg: account.profileImg,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

