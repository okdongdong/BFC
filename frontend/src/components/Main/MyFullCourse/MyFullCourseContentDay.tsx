import { Box, styled } from "@mui/material";
import React from "react";
import { toStringByFormatting } from "../../../layouts/CreateFullCourseNavbar";

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

interface MyFullCourseContentDayProps {
  day: number;
  startedOn: string;
  placeNameList: string[];
}

function MyFullCourseContentDay({
  day,
  placeNameList,
  startedOn,
}: MyFullCourseContentDayProps) {
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
      <div style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold" }}>
        {toStringByFormatting(
          new Date(
            new Date(startedOn).setDate(new Date(startedOn).getDate() + day - 1)
          ),
          "."
        )}
      </div>
      <CircleStlye>
        <p>{day}</p>
      </CircleStlye>
      <PlaceNameStlye>
        {placeNameList.length > 0 ? (
          placeNameList.map((placeName, index) => (
            <div key={index}>{placeName}</div>
          ))
        ) : (
          <div style={{ fontSize: 12, color: "grey" }}>
            <p>예정된 일정이</p>
            <p>없습니다</p>
          </div>
        )}
      </PlaceNameStlye>
    </Box>
  );
}

export default MyFullCourseContentDay;
