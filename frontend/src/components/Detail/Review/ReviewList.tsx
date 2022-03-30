import ReviewListItem from "./ReviewListItem";
import { ReviewListProps } from "../../../types/review";

function ReviewList({ reviewList }: ReviewListProps) {
  return (
    <div className="ReviewList" style={{ marginTop: "10px" }}>
      {reviewList.map((review, idx) => (
        <ReviewListItem
          key={idx}
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
