import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import { connect } from "react-redux";
import StarScore from "../../Main/StarScore";
import noImage from "../../../assets/img/place_img.png";

const CardTitle = styled("div")(() => ({
  display: "flex",
  paddingLeft: 20,
  paddingRight: 20,

  justifyContent: "space-between",
}));
const CardStyle = styled(Card)(() => ({
  width: "100%",
  paddingLeft: 20,
  textAlign: "left",
  backgroundColor: "rgba(0,0,0,0)",
}));

const CardMediaStyle = styled(CardMedia)(() => ({
  height: 350,
  width: 350,
}));

const PlaceTextStyle = styled("p")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
  fontSize: 20,
  fontWeight: "bold",
}));

const PlaceContentTextStyle = styled("p")(() => ({
  fontSize: 14,
  color: "grey",
  marginTop: 8,
  marginBottom: 8,
}));

const PlaceItemTextStyle = styled("p")(() => ({
  fontSize: 14,
  color: "grey",
  marginTop: 8,
  marginBottom: 8,
}));
const PlaceMenuItemTextStyle = styled("p")(() => ({
  fontSize: 14,
  color: "grey",
  marginTop: 0,
  marginBottom: 0,
}));

function PlaceDetail({
  placeId,
  name,
  info,
  openTime,

  address,
  category,
  phone,
  label,
  station,
  averageScore,
  thumbnail,
  menus,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <CardStyle>
        <CardTitle>
          <h1>{name}</h1>
          <StarScore starScore={averageScore}></StarScore>
        </CardTitle>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Paper
            sx={{ margin: 1, minHeight: 100, width: "100%", padding: 0.5 }}
            square
          >
            <CardMediaStyle
              image={
                thumbnail === ""
                  ? "https://www.chanchao.com.tw/images/default.jpg"
                  : thumbnail
              }
              title={name}
            />
          </Paper>
        </div>

        <CardContent>
          <Stack spacing={1}>
            {!info || <PlaceContentTextStyle>{info}</PlaceContentTextStyle>}

            {!address || (
              <>
                <PlaceTextStyle>주소</PlaceTextStyle>
                <PlaceContentTextStyle>{address}</PlaceContentTextStyle>
              </>
            )}

            {!phone || (
              <>
                <PlaceTextStyle>전화번호</PlaceTextStyle>
                <PlaceContentTextStyle>{phone}</PlaceContentTextStyle>
              </>
            )}

            {!station || (
              <>
                <PlaceContentTextStyle>{station}</PlaceContentTextStyle>
              </>
            )}

            {openTime.length === 0 || (
              <>
                <PlaceTextStyle>운영 시간</PlaceTextStyle>
                {openTime.map((time: string, idx: number) => (
                  <PlaceItemTextStyle key={idx}>{time}</PlaceItemTextStyle>
                ))}
              </>
            )}
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
                      <PlaceMenuItemTextStyle>
                        {menu.name}
                      </PlaceMenuItemTextStyle>
                      <PlaceMenuItemTextStyle>
                        {menu.price.toLocaleString()} 원
                      </PlaceMenuItemTextStyle>
                    </div>
                  )
                )}
              </>
            )}
          </Stack>
        </CardContent>
      </CardStyle>
    </div>
  );
}
const mapStateToProps = ({ placeDetailReducer }: any) => ({
  ...placeDetailReducer,
});

type Props = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(PlaceDetail);
