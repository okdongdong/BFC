import React, { useState } from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ReviewInput from "./ReviewInput";
import ReviewList from "./ReviewList";
import { customAxios } from "../../../lib/customAxios";
import { connect } from "react-redux";
import { setReviewList } from "../../../redux/detail/action";
import { SetReview, SetReviewList } from "../../../types/detail";

const useStyles = makeStyles((theme: Theme) => ({
  review: {
    marginTop: theme.spacing(3),
  },
}));
function PlaceReview({ placeId, setReviewList, reviewList }: Props) {
  //리뷰리스트 가져오기
  const fetchData = async () => {
    const result = await customAxios({
      method: "get",
      url: `/review/place/${placeId}`,
    });
    setReviewList(result.data.content);
    console.log(result.data);
    console.log("리뷰!!!", reviewList);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  const classes = useStyles();

  return (
    <div className={classes.review}>
      <ReviewInput></ReviewInput>
      <ReviewList></ReviewList>
    </div>
  );
}
const mapStateToProps = ({ place, reviewList }: any) => {
  return {
    placeId: place.placeId,
    reviewList: reviewList,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceReview);
