import {
  alpha,
  AppBar,
  Box,
  Button,
  Collapse,
  Icon,
  Stack,
  styled,
  Toolbar,
} from "@mui/material";
import { connect } from "react-redux";
import { AccountReducer } from "../redux/rootReducer";
import Logo from "../components/Navbar/Logo";
import NavbarText from "../components/Navbar/NavbarText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/account/actions";

// 헤더 화면 (상단 메뉴바)
const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.down("sm")]: {},
}));

const ToolbarStyle = styled(Toolbar)({
  height: 80,
  padding: "0px !important",
  letterSpacing: "0px",
  width: "100%",
});

const Navbar = ({ isLogin, nickname, profileImg, userLogout }: Props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOpen = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const onClickHandler = async () => {
    try {
      await userLogout();
      navigate("/");
    } catch (e) {}
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />
        <Logo />
        <NavbarText to="attraction" text="여행지"></NavbarText>
        <NavbarText to="restaurant" text="맛집"></NavbarText>
        {!isLogin || (
          <NavbarText
            to="/fullcourse/presurvey"
            text="풀코스만들기"
          ></NavbarText>
        )}
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

            <div
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
              style={{ position: "relative" }}
            >
              <NavbarText
                to={`/profile/${nickname}`}
                text={`${nickname}님`}
              ></NavbarText>
              <Collapse
                in={menuOpen}
                style={{
                  position: "absolute",
                  top: 34,
                  paddingTop: 30,
                }}
              >
                <Stack spacing={1}>
                  <Button
                    sx={{
                      fontSize: 20,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.8)",
                      "&:hover": {
                        backgroundColor: "#47A3EC",
                        color: "white",
                      },
                    }}
                    onClick={() => navigate(`/profile/${nickname}`)}
                  >
                    Profile
                    <Icon sx={{ paddingLeft: 2 }}>account_circle</Icon>
                  </Button>
                  <Button
                    sx={{
                      fontSize: 20,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.8)",
                      "&:hover": {
                        backgroundColor: "#47A3EC",
                        color: "white",
                      },
                    }}
                    onClick={onClickHandler}
                  >
                    Logout <Icon sx={{ paddingLeft: 2 }}>logout</Icon>
                  </Button>
                </Stack>
              </Collapse>
            </div>
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    userLogout: () => dispatch(userLogout()),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
