import { styled } from "@material-ui/core";
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
  }));

  return (
    <NavTextStyle to={to}>
      <h3>{text}</h3>
    </NavTextStyle>
  );
}

export default NavbarText;
