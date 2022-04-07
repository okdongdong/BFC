import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";
import { customAxios } from "../../lib/customAxios";
import { connect } from "react-redux";
function PlaceLike({ placeId }: Props) {
  const [checked, setChecked] = React.useState(false);

  const fetchData = async () => {
    const result = await customAxios({
      method: "get",
      url: `/place/${placeId}/interest`,
    });
    setChecked(result.data.interested);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  function onClick() {
    customAxios({
      method: "post",
      url: `/place/${placeId}/interest`,
    }).then((res) => {
      setChecked(res.data.interested);

      fetchData();
    });
  }
  return (
    <div onClick={onClick} style={{ marginRight: "100%" }}>
      <IconButton>
        {checked === true ? (
          <FavoriteIcon sx={{ color: pink[500] }}></FavoriteIcon>
        ) : (
          <FavoriteBorderIcon sx={{ color: pink[500] }}></FavoriteBorderIcon>
        )}
      </IconButton>
    </div>
  );
}
const mapStateToProps = ({ place }: any) => {
  return {
    placeId: place.placeId,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PlaceLike);
