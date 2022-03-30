import React, { useState } from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ReviewInput from "./ReviewInput";
import ReviewList from "./ReviewList";

const useStyles = makeStyles((theme: Theme) => ({
  review: {
    marginTop: theme.spacing(15),
  },
}));
function PlaceReview() {
  const classes = useStyles();
  const initList = [
    {
      reviewId: 1,
      profile:
        "https://cdn.gukjenews.com/news/photo/202110/2328684_2319618_5032.png",
      nickname: "조이조이",
      content: "꽃가루가날아아아려",
    },
    {
      reviewId: 2,
      profile:
        "https://cdn.gukjenews.com/news/photo/202110/2328684_2319618_5032.png",
      nickname: "조이조이",
      content: "꽃가루를날아아아려",
    },
  ];
  const [reviewList, setReviewList] = useState(initList);
  return (
    <div className={classes.review}>
      <ReviewInput
        reviewList={reviewList}
        setReviewList={setReviewList}
      ></ReviewInput>
      <ReviewList reviewList={reviewList}></ReviewList>
    </div>
  );
}
export default PlaceReview;
