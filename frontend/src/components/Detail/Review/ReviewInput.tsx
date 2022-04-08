import React, { useState, KeyboardEvent } from "react";
import { Button, TextField, Box } from "@mui/material";
import { connect } from "react-redux";
import { customAxios } from "../../../lib/customAxios";
import { SetReview } from "../../../types/detail";
import { setReviewList } from "../../../redux/detail/action";
interface InputReviewProps {
  profileImg: string;
  nickname: string;
  content: string;
  userId: number;
}
const ReviewInput = ({
  setReviewList,
  placeId,
  profileImg,
  nickname,
  reviewList,
  currentUserId,
}: Props) => {
  const [content, setContent] = useState("");
  const review: InputReviewProps = {
    profileImg: profileImg,
    nickname: nickname,
    content: content,
    userId: currentUserId,
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const onClick = () => {
    customAxios({
      method: "post",
      url: `/review/place/${placeId}`,
      data: { content: content },
    }).then((res) => {
      const newReviewList = [...reviewList];
      newReviewList.push(review);
      setReviewList(newReviewList);
    });
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
const mapStateToProps = ({ account, place, reviewList }: any) => {
  return {
    placeId: place.placeId,
    profileImg: account.profileImg,
    nickname: account.nickname,
    reviewList: reviewList.reviewList,
    currentUserId: account.userId,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setReviewList: (reviewList: SetReview[]) =>
      dispatch(setReviewList(reviewList)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInput);
