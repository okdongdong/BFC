import { styled } from "@mui/styles";
import React from "react";

interface Props {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  backgroundColor?: string;
  margin?: string | number;
  borderRadius?: string | number;
}

function ScrollableBox({
  width = "60%",
  height = "80%",
  padding = 0,
  backgroundColor = "white",
  borderRadius = "0px",
  margin = 0,
  children,
}: Props) {
  const ContentBox = styled("div")(() => ({
    width: width,
    height: height,
    padding: padding,
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    margin: margin,
    overflowY: "scroll",
    position: "relative",
    /* 스크롤바 설정*/
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    /* 스크롤바 막대 설정*/
    "&::-webkit-scrollbar-thumb": {
      height: "100px",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: " 10px",
    },
    /* 스크롤바 뒷 배경 설정*/
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(0,0,0,0)",
    },

    // scrollBehavior: "smooth",
  }));

  return <ContentBox>{children}</ContentBox>;
}

export default ScrollableBox;
