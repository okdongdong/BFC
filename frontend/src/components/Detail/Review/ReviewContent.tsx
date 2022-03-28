import { ReviewProps } from "../../../types/Review";
import axios from "axios";
import { TextField } from "@mui/material";
import { useState } from "react";
const ReviewContent = ({ reviewId, content }: ReviewProps) => {
  const [newContent, setNewContent] = useState("");
  function deleteReview() {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/review/${reviewId}`,
    }).then((res) => {
      console.log(res);
    });
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewContent(e.target.value);
  }
  const onClick = () => {
    const content = newContent;
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/review/${reviewId}`,
      data: content,
    }).then((res) => {
      console.log(res);
    });
  };
  const isMine = true;
  return (
    <div style={{ fontSize: "18px", textAlign: "left", marginLeft: "60px" }}>
      {isMine ? (
        <div>
          <TextField
            id="standard-basic"
            hiddenLabel
            size="small"
            value={content}
            style={{ width: "80%" }}
            onChange={onChange}
          ></TextField>
          <button onClick={onClick}>수정</button>
          <button onClick={deleteReview}>삭제</button>
        </div>
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
};
export default ReviewContent;
