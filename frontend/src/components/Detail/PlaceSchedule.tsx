import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconButton from "@mui/material/IconButton";
import { connect } from "react-redux";
function PlaceSchedule({ openTime }: Props) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const [time, setTime] = React.useState([]);
  // setTime(openTime);
  const icon = (
    <Paper
      sx={{
        m: 1,
        padding: "10px",
        whiteSpace: "pre-wrap",
        textAlign: "center",
      }}
      elevation={4}
    >
      {openTime ? (
        <div>
          <div>{openTime[0]}</div>
          <div>{openTime[1]}</div>
        </div>
      ) : (
        <div style={{ color: "gray" }}>운영시간정보 준비중</div>
      )}

      {/* {time.map((t, idx) => (
        <div>{openTime[idx]}</div>
      ))} */}
    </Paper>
  );
  return (
    <Box sx={{ height: 180 }}>
      <div onClick={handleChange}>
        운영시간
        <IconButton>
          {checked ? (
            <ArrowDropUpIcon></ArrowDropUpIcon>
          ) : (
            <ArrowDropDownIcon></ArrowDropDownIcon>
          )}
        </IconButton>
      </div>
      <Box sx={{ display: "flex", justifyContent: "left" }}>
        <Fade in={checked}>{icon}</Fade>
      </Box>
    </Box>
  );
}
const mapStateToProps = ({ place }: any) => {
  return {
    openTime: place.openTime,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PlaceSchedule);
