import { Box, styled } from "@mui/material";
import { connect } from "react-redux";

const PlaceTextStyle = styled("p")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
  fontSize: 20,
  fontWeight: "bold",
}));

const PlaceMenuItemTextStyle = styled("p")(() => ({
  fontSize: 14,
  color: "grey",
  marginTop: 0,
  marginBottom: 0,
}));
function Menu({ menus }: Props) {
  return (
    <div>
      {menus.length === 0 || (
        <>
          <PlaceTextStyle>메뉴</PlaceTextStyle>
          {menus.map(
            (
              menu: { menuId: number; name: string; price: number },
              idx: number
            ) => (
              <div
                key={`menu-${idx}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <PlaceMenuItemTextStyle>{menu.name}</PlaceMenuItemTextStyle>
                <PlaceMenuItemTextStyle>
                  {menu.price.toLocaleString()} 원
                </PlaceMenuItemTextStyle>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
const mapStateToProps = ({ place }: any) => {
  return {
    menus: place.menus,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Menu);
