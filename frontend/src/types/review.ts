import setReviewList from "../components/Detail/Review/PlaceReview";
export interface ReviewProps {
  reviewId: number;
  profile: string;
  nickname: string;
  content: string;
}
export interface ReviewListProps {
  setReviewList?: React.Dispatch<React.SetStateAction<ReviewProps[]>>;
  reviewList: ReviewProps[];
}
