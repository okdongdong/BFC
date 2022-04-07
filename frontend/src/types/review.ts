import setReviewList from "../components/Detail/Review/PlaceReview";
export interface ReviewProps {
  reviewId?: number;
  userId?: number;
  profileImg: string;
  nickname: string;
  content: string;
  index: number;
}
export interface ReviewListProps {
  setReviewList?: React.Dispatch<React.SetStateAction<ReviewProps[]>>;
  reviewList: ReviewProps[];
  [key: string]: any;
}
