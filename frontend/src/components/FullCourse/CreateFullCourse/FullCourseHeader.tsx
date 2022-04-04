import {
  Button,
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";

function FullCourseHeader({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const filterType = ["평점순", "거리순", "사전설문순"];
  const [nowFilterTypeIdx, setNowFilterTypeIdx] = useState<number>(0);

  const FilterTextStyle = styled("div")((attr: { idx: number }) => ({
    backgroundColor: `${attr.idx === nowFilterTypeIdx ? "#57A3EC" : "white"}`,
    color: `${attr.idx !== nowFilterTypeIdx || "white"}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    height: 50,
    width: "100%",
    position: "relative",
    fontSize: 20,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#9ACBF2",
      color: "white",
    },
  }));

  const FilterTextBox = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
    fontSize: 20,
    fontWeight: "bold",
  }));

  const onclickHandler = (idx: number) => {
    setNowFilterTypeIdx(idx);
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        justifyContent: "center",
        display: "flex",
        backgroundColor: "white",
        zIndex: 400,
      }}
    >
      <div
        style={{
          width: "85%",
          position: "relative",
        }}
      >
        <h1>Full Course</h1>
      </div>
      <Button
        sx={{ position: "absolute", right: 0 }}
        onClick={() => setOpenModal((val) => !val)}
      >
        나만의 장소 추가하기
      </Button>
    </div>
  );
}

export default FullCourseHeader;
