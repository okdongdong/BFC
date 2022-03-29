import React, { useState, KeyboardEvent } from "react";
import { Button, TextField, Box } from "@mui/material";
import { ReviewListProps, ReviewProps } from "../../../types/Review";
import axios from "axios";
const ReviewInput = ({ reviewList, setReviewList }: ReviewListProps) => {
  const place_id = 1; //리덕스로 받기
  const [content, setContent] = useState("");
  const review: ReviewProps = {
    reviewId: 1,
    profile:
      "https://cdn.gukjenews.com/news/photo/202110/2328684_2319618_5032.png",
    nickname: "뉴조이이",
    content: content,
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const onClick = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/review/place/${place_id}`,
      data: review,
    }).then((res) => {
      console.log(res);
    });
    console.log(review);
    if (setReviewList !== undefined) {
      setReviewList((r) => [review, ...r]);
    }
    setContent(""); //내용 초기화
  };
  const onKeyPress = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      onClick(); //enter누르면 작성
    }
  };
  return (
    <div>
      <p style={{ fontSize: "18px", textAlign: "left" }}>리뷰</p>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <Box
          onKeyPress={onKeyPress}
          sx={{
            width: "100%",
          }}
        >
          <TextField
            onChange={onChangeContent}
            value={content}
            fullWidth
            placeholder="내용을 입력해주세요"
            id="review"
          />
        </Box>
        <Button
          onClick={onClick}
          variant="contained"
          style={{ marginLeft: "10px" }}
        >
          작성
        </Button>
      </form>
    </div>
  );
};
export default ReviewInput;
