import { styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface navbarTextProps {
  to: string;
  text: string;
  color?: string;
}

function NavbarText({ to, text, color = "#0787EC" }: navbarTextProps) {
  const NavTextStyle = styled(RouterLink)(({ theme }) => ({
    alignItems: "center",
    textDecoration: "none",
    color: color,
    margin: theme.spacing(0, 2),
    fontSize: "24px",
    fontWeight: "bold",
    height: 36,
  }));

  return <NavTextStyle to={to}>{text}</NavTextStyle>;
}

export default NavbarText;
