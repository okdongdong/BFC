import ReviewListItem from "./ReviewListItem";
import axios from "axios";
import { ReviewListProps } from "../../../types/Review";

function ReviewList({ reviewList, setReviewList }: ReviewListProps) {
  return (
    <div className="ReviewList" style={{ marginTop: "10px" }}>
      {reviewList.map((review) => (
        <ReviewListItem
          reviewId={review.reviewId}
          profile={review.profile}
          nickname={review.nickname}
          content={review.content}
        ></ReviewListItem>
      ))}
    </div>
  );
}
export default ReviewList;
