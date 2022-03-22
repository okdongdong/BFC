import { Box, styled } from "@mui/material";
import React from "react";
import { MyFullCourseContentDayProps } from "../../../types/Main";

const CircleStlye = styled("div")(() => ({
  marginRight: 0,
  borderRadius: "50%",
  backgroundColor: "white",
  color: "black",
  width: 48,
  height: 48,
  fontSize: 24,
  fontWeight: "bold",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  marginBottom: 8,
}));

const PlaceNameStlye = styled("div")(() => ({
  fontSize: 20,
  fontWeight: "bold",
  color: "black",
}));

function MyFullCourseContentDay({
  courseDate,
  day,
  placeList,
}: MyFullCourseContentDayProps) {
  placeList.sort((item) => item.order);

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
      }}
    >
      <h3>{courseDate}</h3>
      <CircleStlye>
        <p>{day}</p>
      </CircleStlye>
      <PlaceNameStlye>
        {placeList.map((place) => (
          <div>{place.name}</div>
        ))}
      </PlaceNameStlye>
    </Box>
  );
}

export default MyFullCourseContentDay;
