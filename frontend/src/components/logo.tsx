import { Box, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";

import bfcLogo from "../assets/img/logo_no_text.png";
const useStyles = makeStyles(() => ({
  logo: {
    maxHeight: "64px", // Fix IE 11 issue.
  },
  logoContainer: {
    alignItems: "center",
    textDecoration: "none",
    color: "#0787EC",
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    textAlign: "left",
    flexDirection: "column",
  },
}));

function Logo() {
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;

  const classes = useStyles();
  const TextStyle = styled("h3")(() => ({
    fontSize: 16,
    paddingLeft: 8,
    paddingRight: 8,
    margin: "0px",
  }));

  const LogoStyle = styled(Box)(({ theme }) => ({
    maxHeight: APPBAR_MOBILE,
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      minHeight: APPBAR_DESKTOP,
    },
  }));

  return (
    <LogoStyle>
      <RouterLink to="/" className={classes.logoContainer}>
        <img className={classes.logo} src={bfcLogo} alt="Logo" />
        <div className={classes.textContainer}>
          <TextStyle>Busan</TextStyle>
          <TextStyle>Full</TextStyle>
          <TextStyle>Course</TextStyle>
        </div>
      </RouterLink>
    </LogoStyle>
  );
}

export default Logo;
