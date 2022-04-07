import Reviewer from "./Reviewer";
import ReviewContent from "./ReviewContent";
import { ReviewProps } from "../../../types/review";
import { SetReview } from "../../../types/detail";
const ReviewListItem = ({
  profileImg,
  nickname,
  content,
  reviewId,
  userId,
  index,
}: SetReview) => {
  return (
    <div style={{ width: "100%" }}>
      <Reviewer
        index={index}
        profileImg={profileImg}
        nickname={nickname}
        content={content}
      ></Reviewer>
      <ReviewContent
        index={index}
        profileImg={profileImg}
        nickname={nickname}
        content={content}
        reviewId={reviewId}
        userId={userId}
      ></ReviewContent>
      <hr></hr>
    </div>
  );
};
export default ReviewListItem;
