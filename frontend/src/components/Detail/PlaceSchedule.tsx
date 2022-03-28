import * as React from "react";
import { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconButton from "@mui/material/IconButton";
const time =
  "월요일:09:00~18:00 \n 월요일:09:00~18:00 \n월요일:09:00~18:00 \n월요일:09:00~18:00 \n월요일:09:00~18:00";
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
    {time}
  </Paper>
);
function PlaceSchedule() {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

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
export default PlaceSchedule;
