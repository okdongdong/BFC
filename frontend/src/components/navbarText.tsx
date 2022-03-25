import { styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface navbarTextProps {
  to: string;
  text: string;
}

function NavbarText({ to, text }: navbarTextProps) {
  const NavTextStyle = styled(RouterLink)(({ theme }) => ({
    alignItems: "center",
    textDecoration: "none",
    color: "#0787EC",
    margin: theme.spacing(0, 2),
    fontSize: "24px",
    fontWeight: "bold",
    height: 36,
  }));

  return <NavTextStyle to={to}>{text}</NavTextStyle>;
}

export default NavbarText;
