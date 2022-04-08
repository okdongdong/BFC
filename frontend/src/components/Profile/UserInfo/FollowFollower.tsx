import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { connect, connectAdvanced } from "react-redux";
import { customAxios } from "../../../lib/customAxios";
import { setProfileData } from "../../../redux/profile/actions";
import { AccountReducer, ProfileReducer } from "../../../redux/rootReducer";
import { SetProfileData } from "../../../types/profile";
import FollowModal from "./FollowModal";
interface person {
  id: number;
  nickname: string;
  profileImg: string;
  isFollowing: boolean;
}
const useStyles = makeStyles((theme: Theme) => ({
  follow: {
    fontSize: 20,
    fontWeight: "bold",
    width: 200,
    height: 20,
  },
}));
function FollowFollower({
  followingCnt,
  followerCnt,
  userId,
  setProfileData,
}: Props) {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(0);
  const classes = useStyles();
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  const fetchData1 = async () => {
    const result = await customAxios({
      method: "get",
      url: `/users/${userId}/followTo`,
    });
    setFollowingList(result.data);
  };
  const fetchData2 = async () => {
    const result = await customAxios({
      method: "get",
      url: `/users/${userId}/followFrom`,
    });
    setFollowerList(result.data);
  };
  React.useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  return (
    <div>
      <div className={classes.follow}>
        <thead>
          <tr>
            <th>팔로워</th>
            <th>|</th>
            <th>팔로잉</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              onClick={() => {
                setOpen(true);
                setOption(0);
              }}
            >
              {followerCnt}
            </td>
            <td></td>
            <td
              onClick={() => {
                setOpen(true);
                setOption(1);
              }}
            >
              {followingCnt}
            </td>
          </tr>
        </tbody>
      </div>
      {open && !option ? (
        <FollowModal
          open={open}
          setOpen={() => setOpen(false)}
          contentList={followerList}
          title="팔로워"
        ></FollowModal>
      ) : (
        <FollowModal
          open={open}
          setOpen={() => setOpen(false)}
          contentList={followingList}
          title="팔로잉"
        ></FollowModal>
      )}
    </div>
  );
}
const mapStateToProps = ({ account, profile }: any) => {
  return {
    isLogin: account.isLogin,
    userId: profile.userId,
    followingCnt: profile.followingCnt,
    followerCnt: profile.followerCnt,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setProfileData: (profileData: SetProfileData) =>
      dispatch(setProfileData(profileData)),
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FollowFollower);
