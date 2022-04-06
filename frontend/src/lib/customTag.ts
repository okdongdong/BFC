import { styled } from "@mui/styles";

export const ModalScrollableBox = styled("div")(({ theme }) => ({
  width: "100%",
  height: "80%",
  padding: 0,
  backgroundColor: "white",
  borderRadius: "0px",
  margin: 0,
  overflow: "overlay",
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
}));

export const ScrollableBox = styled("div")(({ theme }) => ({
  width: 400,
  height: "calc(100vh - 80px)",
  padding: 0,
  backgroundColor: "#EDEDED",
  borderRadius: "0px",
  boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  margin: 0,
  overflow: "overlay",
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
}));

export const InfiniteScrollableBox = styled("div")(({ theme }) => ({
  width: 400,
  height: "calc(100vh - 80px)",
  padding: 0,
  backgroundColor: "#EDEDED",
  borderRadius: "0px",
  boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  margin: 0,
  overflow: "overlay",
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
}));
