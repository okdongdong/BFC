import { alpha, AppBar, Box, styled, Toolbar } from "@mui/material";
import { connect } from "react-redux";
import { AccountReducer } from "../redux/rootReducer";
import Logo from "../components/Navbar/LogoWhite";
import NavbarText from "../components/Navbar/NavbarText";

// 헤더 화면 (상단 메뉴바)
const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha("#0787EC", 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: 80,
  padding: "0px !important",
  letterSpacing: "0px",
  width: "100%",
}));

const CreateFullCourseNavbar = ({ isLogin, nickname, profileImg }: Props) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />
        <Logo />
        <Box sx={{ flexGrow: 10 }} />
        {isLogin ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <img
                src={profileImg}
                alt="profileImg"
                style={{ width: 48, height: 48, borderRadius: "50%" }}
              />
            </Box>
            <NavbarText
              color="white"
              to="/profile"
              text={`${nickname} 님 외 0명`}
            ></NavbarText>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <NavbarText color="white" to="/signup" text="회원가입"></NavbarText>
            <NavbarText color="white" to="/login" text="로그인"></NavbarText>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFullCourseNavbar);
