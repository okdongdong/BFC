import { ReviewProps } from "../../../types/review";
import { TextField } from "@mui/material";
import { useState } from "react";
import { customAxios } from "../../../lib/customAxios";
import { connect } from "react-redux";
import { SetReview } from "../../../types/detail";
import { setReviewList } from "../../../redux/detail/action";
const ReviewContent = ({
  reviewId,
  content,
  currentUserId,
  userId,
  index,
  reviewList,
  setReviewList,
}: ReviewProps & Props) => {
  const [newContent, setNewContent] = useState(content);
  const [btnName, setBtnName] = useState("수정");
  function deleteReview() {
    customAxios({
      method: "delete",
      url: `/review/${reviewId}`,
    }).then((res) => {
      const newReviewList = [...reviewList];
      newReviewList.splice(index, 1);
      console.log(newReviewList);
      setReviewList(newReviewList);
      console.log(res);
    });
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewContent(e.target.value);
  }
  const onClick = () => {
    customAxios({
      method: "put",
      url: `/review/${reviewId}`,
      data: { content: newContent },
    }).then((res) => {
      setBtnName("수정");
      const newReviewList = [...reviewList];
      newReviewList[index].content = newContent;
      console.log(newReviewList);
      setReviewList(newReviewList);
      console.log(res);
    });
  };
  const updateReview = () => {
    setBtnName("완료");
  };
  return (
    <div style={{ fontSize: "18px", textAlign: "left", marginLeft: "60px" }}>
      {currentUserId === userId ? (
        <div>
          {btnName === "완료" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="standard-basic"
                hiddenLabel
                size="small"
                value={newContent}
                style={{ width: "80%" }}
                onChange={onChange}
              ></TextField>
              <div>
                <button onClick={onClick} style={{ marginRight: "10px" }}>
                  {btnName}
                </button>
                <button onClick={deleteReview}>삭제</button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {content}
              <div>
                <button onClick={updateReview} style={{ marginRight: "10px" }}>
                  {btnName}
                </button>
                <button onClick={deleteReview}>삭제</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
};
const mapStateToProps = ({ account, reviewList }: any) => {
  return {
    currentUserId: account.userId,
    reviewList: reviewList.reviewList,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContent);
