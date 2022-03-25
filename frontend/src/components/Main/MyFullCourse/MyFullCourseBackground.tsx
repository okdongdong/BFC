import { Box, CardMedia, styled } from "@mui/material";
import React from "react";
interface thumbnailListProps {
  thumbnailList: string[];
}

const CardMediaStyle = styled(CardMedia)(() => ({
  height: 300,
  width: "100%",
}));

const CardBackgroundStyle = styled("div")(() => ({
  backgroundColor: "rgba(0,0,0,0.5)",
  height: 300,
  width: "100%",
  position: "absolute",
  top: 0,
}));

function MyFullCourseBackground({ thumbnailList }: thumbnailListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <CardBackgroundStyle />
      {thumbnailList.map((thumbnail, idx) => (
        <CardMediaStyle
          key={idx}
          image={thumbnail}
          title={`thumbnail-${idx}`}
        />
      ))}
    </Box>
  );
}

export default MyFullCourseBackground;
