import Reviewer from "./Reviewer";
import ReviewContent from "./ReviewContent";
import { ReviewProps } from "../../../types/review";
const ReviewListItem = ({
  reviewId,
  profile,
  nickname,
  content,
}: ReviewProps) => {
  return (
    <div style={{ width: "100%" }}>
      <Reviewer
        profile={profile}
        nickname={nickname}
        reviewId={reviewId}
        content={content}
      ></Reviewer>
      <ReviewContent
        profile={profile}
        nickname={nickname}
        reviewId={reviewId}
        content={content}
      ></ReviewContent>
      <hr></hr>
    </div>
  );
};
export default ReviewListItem;
