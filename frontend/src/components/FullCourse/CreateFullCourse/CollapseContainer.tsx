import { Icon, Theme } from "@mui/material";
import { styled } from "@mui/material";
import { Collapse } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";

const useCollapseStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 0,
    width: "auto",
  },
  container: {
    minWidth: 0,
    height: "auto",
    width: 0,
    overflow: "hidden",
    transition: theme.transitions.create("width"),
  },
  entered: {
    width: "auto",
    height: "auto",
    overflow: "visible",
  },
  hidden: {
    visibility: "hidden",
  },
  wrapper: {
    display: "flex",
    width: "auto",
    height: "100%",
  },
  wrapperInner: {
    width: "auto",
    height: "100%",
  },
}));

const CollapseBox = styled("div")(() => ({
  height: "100%",
  backgroundColor: "yellow",
  display: "flex",
  position: "relative",
}));

type CollapseContainerProps = {
  buttonPositionY?: number;
  children?: React.ReactNode;
  backgroundColor?: string;
  setNowScrollPosition?: React.Dispatch<React.SetStateAction<number>>;
  dayChange?: boolean;
};

function CollapseContainer({
  buttonPositionY = 0,
  children,
  backgroundColor = "#efffff",
  dayChange = false,
  setNowScrollPosition,
}: CollapseContainerProps) {
  const [expanded, setExpanded] = useState(true);

  const ContentBox = styled("div")(() => ({
    height: "calc(100vh - 80px)",
    width: 400,
    backgroundColor: backgroundColor,
    position: "relative",
    overflowY: "scroll",
    // scrollBehavior: "smooth",

    /* 스크롤바 설정*/
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    /* 스크롤바 막대 설정*/
    "&::-webkit-scrollbar-thumb": {
      height: "17%",
      backgroundColor: "rgba(33,133,133,1)",
      borderRadius: " 10px",
    },
    /* 스크롤바 뒷 배경 설정*/
    "&::-webkit-scrollbar-track": {
      backgroundColor: " rgba(33,133,133,0.33)",
    },
  }));

  useEffect(() => {
    setExpanded(false);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   console.log(typeof setNowScrollPosition, ref.current !== null, dayChange);
  //   if (
  //     typeof setNowScrollPosition !== "undefined" &&
  //     ref.current !== null &&
  //     dayChange &&
  //     ref.current.scrollTop > 0
  //   ) {
  //     setNowScrollPosition(ref.current.scrollTop);
  //   }
  // }, [dayChange]);

  const ExpandButton = styled("div")(() => ({
    width: 30,
    height: 200,
    "&:hover": {
      backgroundColor: "black",
    },
    backgroundColor: "white",
    borderRadius: "0 25px 25px 0",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    fontSize: 24,
    boxShadow: "1.2px 2px 1px 1px rgba(0,0,0,0.2)",
    position: "absolute",
    top: buttonPositionY,
    zIndex: 1000,
  }));

  return (
    <CollapseBox>
      <Collapse
        in={expanded}
        orientation="horizontal"
        classes={useCollapseStyles()}
      >
        <ContentBox ref={ref}>{children}</ContentBox>
      </Collapse>
      <div style={{}}>
        <ExpandButton onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <Icon sx={{ fontSize: 30 }}>arrow_left_sharp</Icon>
          ) : (
            <Icon sx={{ fontSize: 30 }}>arrow_right_sharp</Icon>
          )}
        </ExpandButton>
      </div>
    </CollapseBox>
  );
}

export default CollapseContainer;
