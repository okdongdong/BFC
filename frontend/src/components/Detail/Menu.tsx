import { Box } from "@mui/material";
import { connect } from "react-redux";

function Menu({ menu }: Props) {
  return (
    <div>
      {menu ? (
        <div style={{ textAlign: "left", margin: "8px" }}>
          메뉴
          <Box>{menu}</Box>{" "}
        </div>
      ) : (
        <Box>{/* <p style={{ color: "gray" }}>메뉴정보 준비중</p> */}</Box>
      )}
    </div>
  );
}
const mapStateToProps = ({ place }: any) => {
  return {
    menu: place.menu,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Menu);
