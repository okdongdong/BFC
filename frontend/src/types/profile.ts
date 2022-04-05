import { FullCourseProps, PlaceCardProps } from "./main";

export interface SetProfileData {
  userId: number;
  username: string;
  nickname: string;
  profileImg?: string;
  isFollowing: boolean;
  followingCnt: number;
  followerCnt: number;
  interestList: PlaceCardProps[];
  myList: FullCourseProps[];
  likeList: FullCourseProps[];
  [key: string]: any;
}
