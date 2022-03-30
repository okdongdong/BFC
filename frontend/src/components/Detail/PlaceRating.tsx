import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { customAxios } from "../../lib/customAxios";
const labels: { [index: string]: string } = {
  0.5: "0.5",
  1: "1",
  1.5: "1.5",
  2: "2",
  2.5: "2.5",
  3: "3",
  3.5: "3.5",
  4: "4",
  4.5: "4.5",
  5: "5",
};

function PlaceRating() {
  const [value, setValue] = React.useState<number | null>(1); //별점 default값
  const [hover, setHover] = React.useState(-1);
  const place_id = 1; //데이터 가져오기
  function onChange() {
    const score = value;
    customAxios({
      method: "post",
      url: `/place/${place_id}/score`,
      data: score,
    }).then((res) => {
      console.log(res);
    });
  }
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          onChange();
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
export default PlaceRating;
