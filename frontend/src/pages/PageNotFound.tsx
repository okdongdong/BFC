import { Button, Container, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const TextBox = styled("div")({
  margin: 128,
  fontSize: 48,
  fontWeight: "bold",
});
function PageNotFound() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <Container component="main">
      <TextBox>페이지를 찾을 수 없습니다</TextBox>
      <Button onClick={onClickHandler} sx={{ fontSize: 32 }}>
        홈으로 가기
      </Button>
    </Container>
  );
}

export default PageNotFound;
