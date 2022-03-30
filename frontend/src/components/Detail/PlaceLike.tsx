import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";
import { customAxios } from "../../lib/customAxios";
function PlaceLike() {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    onClick();
    setChecked((prev) => !prev);
  };
  const place_id = 1; //데이터 가져옴
  function onClick() {
    customAxios({
      method: "post",
      url: `/place/${place_id}/interest`,
    }).then((res) => {
      console.log(res);
    });
  }
  return (
    <div onClick={handleChange} style={{ marginRight: "100%" }}>
      <IconButton>
        {checked ? (
          <FavoriteIcon sx={{ color: pink[500] }}></FavoriteIcon>
        ) : (
          <FavoriteBorderIcon sx={{ color: pink[500] }}></FavoriteBorderIcon>
        )}
      </IconButton>
    </div>
  );
}
export default PlaceLike;
