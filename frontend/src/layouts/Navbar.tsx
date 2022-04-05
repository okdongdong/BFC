import {
  alpha,
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  styled,
  Toolbar,
} from "@mui/material";
import { connect } from "react-redux";
import { AccountReducer } from "../redux/rootReducer";
import Logo from "../components/Navbar/Logo";
import NavbarText from "../components/Navbar/NavbarText";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { userLogout } from "../redux/account/actions";
import Profile from "../pages/Profile/Profile";

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const token = localStorage.getItem("accessToken") || "";
  const refreshToken = localStorage.getItem("refreshToken") || "";
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("열림");
    console.log(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    console.log("닫힘");
  };
  function requestLogOut() {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`,
      headers: {
        Authorization: token,
        RefreshToken: refreshToken,
      },
    })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        userLogout();
      })
      .catch((err) => console.log(err));
  }

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />
        <Logo />
        <NavbarText to="attraction" text="여행지"></NavbarText>
        <NavbarText to="restaurant" text="맛집"></NavbarText>
        <NavbarText to="info" text="이용방법"></NavbarText>
        <NavbarText to="/fullcourse/presurvey" text="풀코스만들기"></NavbarText>
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

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onMouseEnter={handleClick}
                // onMouseOut={handleClose}
              >
                <div
                  style={{
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#0787EC",
                    margin: "16px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    height: 36,
                  }}
                >
                  {nickname}님
                </div>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  style={{
                    width: "200px",
                    height: "30px",
                    fontSize: "20px",
                    color: "#0787EC",
                  }}
                >
                  <p style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Link
                      to={`/profile/${nickname}`}
                      style={{ textDecoration: "none", color: "#0787EC" }}
                    >
                      Profile
                    </Link>
                  </p>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  style={{
                    width: "200px",
                    height: "30px",
                    fontSize: "20px",
                    color: "#0787EC",
                  }}
                >
                  <p
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    onClick={requestLogOut}
                  >
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "#0787EC" }}
                    >
                      Logout
                    </Link>
                  </p>
                </MenuItem>
              </Menu>
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
