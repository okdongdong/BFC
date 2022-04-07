import ReviewListItem from "./ReviewListItem";
import { ReviewListProps } from "../../../types/review";
import { connect } from "react-redux";
import { SetReview, SetReviewList } from "../../../types/detail";

function ReviewList({ reviewList }: Props) {
  console.log("리뷰리스트", reviewList);

  return (
    <div className="ReviewList" style={{ marginTop: "10px" }}>
      {reviewList.length > 0 ? (
        <div>
          {reviewList.map((review: SetReview, idx: number) => (
            <ReviewListItem
              key={idx}
              index={idx}
              profileImg={review.profileImg}
              nickname={review.nickname}
              content={review.content}
              reviewId={review.reviewId}
              userId={review.userId}
              postedAt={review.postedAt}
              updatedAt={review.updatedAt}
            ></ReviewListItem>
          ))}
        </div>
      ) : (
        <div>등록된 리뷰가 없어요...첫 리뷰를 작성해주세요</div>
      )}
    </div>
    // <div></div>
  );
}
const mapStateToProps = ({ place, reviewList }: any) => {
  return {
    placeId: place.placeId,
    reviewList: reviewList.reviewList,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ReviewList);
