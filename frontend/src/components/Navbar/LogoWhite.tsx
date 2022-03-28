import { Box, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";

import bfcLogo from "../../assets/img/logo_no_text_white.png";
const useStyles = makeStyles(() => ({
  bfcLogo: {
    height: "64px", // Fix IE 11 issue.
  },
  logoContainer: {
    alignItems: "center",
    textDecoration: "none",
    color: "white",
    display: "flex",
    flexDirection: "row",
  },
  logoTextContainer: {
    textAlign: "left",
    flexDirection: "column",
  },
}));

function Logo() {
  const classes = useStyles();
  const TextStyle = styled("h3")(() => ({
    fontSize: "20px",
    paddingLeft: 8,
    paddingRight: 24,
    margin: "0px",
    fontFamily: "Sunflower, sans-serif",
    lineHeight: 1,
  }));

  const LogoStyle = styled(Box)(({ theme }) => ({
    maxHeight: 80,
  }));

  return (
    <LogoStyle>
      <RouterLink to="/" className={classes.logoContainer}>
        <img className={classes.bfcLogo} src={bfcLogo} alt="Logo" />
        <div className={classes.logoTextContainer}>
          <TextStyle>Busan</TextStyle>
          <TextStyle>Full</TextStyle>
          <TextStyle>Course</TextStyle>
        </div>
      </RouterLink>
    </LogoStyle>
  );
}

export default Logo;
