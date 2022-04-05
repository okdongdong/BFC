import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { connect, connectAdvanced } from "react-redux";
import { customAxios } from "../../../lib/customAxios";
import { AccountReducer, ProfileReducer } from "../../../redux/rootReducer";
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
function FollowFollower({ followingCnt, followerCnt, userId }: Props) {
  const [open, setOpen] = React.useState(false);
  // const [option, setOption] = React.useState(0);
  // const [optionList, setOptionList] = React.useState(Array<person>());
  const [title, setTitle] = React.useState("");
  const classes = useStyles();
  const follower: number = followerCnt;
  const following: number = followingCnt;
  const [followingList, setFollowingList] = React.useState([]);
  const [followerList, setFollowerList] = React.useState([]);

  const fetchData1 = async () => {
    const result = await customAxios({
      method: "get",
      url: `/users/${userId}/followTo`,
    });
    setFollowingList(result.data);
    console.log("팔로워", result.data);
  };
  const fetchData2 = async () => {
    const result = await customAxios({
      method: "get",
      url: `/users/${userId}/followFrom`,
    });
    setFollowerList(followerList.concat(result.data));
    console.log("팔로잉", result.data);
  };
  React.useEffect(() => {
    fetchData1();
    fetchData2();
    console.log(followingList);
    console.log(followerList);
  }, []);
  // const followingList: Array<person> = [
  //   {
  //     id: 1,
  //     nickname: "전호정",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWx-k-_VAcLjN8c11jfHrc0jYDZ_JciPdPg&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 2,
  //     nickname: "양지훈",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20HqpN3jmay7YPuO9FnBJ9y7N9KE2E-62lQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 3,
  //     nickname: "정성우",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW85_cRjVdLJcljHMN6LZ9kbhoojf2Sxd8uQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 4,
  //     nickname: "강동옥",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFA53irlX3ztfUplBdBwf9mMvDCksTleKpg&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 5,
  //     nickname: "김태현",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaINYL0wk4kJL6u0AC2NMAd6eL0I7u3QmnxQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 6,
  //     nickname: "김도훈",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H9zWNDYaZaukidKZ-exc3X-2mt1HThBteQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  // ];
  // const followerList: Array<person> = [
  //   {
  //     id: 1,
  //     nickname: "전호정",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWx-k-_VAcLjN8c11jfHrc0jYDZ_JciPdPg&usqp=CAU",
  //     isFollowing: false,
  //   },
  //   {
  //     id: 2,
  //     nickname: "양지훈",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20HqpN3jmay7YPuO9FnBJ9y7N9KE2E-62lQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 3,
  //     nickname: "정성우",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW85_cRjVdLJcljHMN6LZ9kbhoojf2Sxd8uQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 4,
  //     nickname: "강동옥",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFA53irlX3ztfUplBdBwf9mMvDCksTleKpg&usqp=CAU",
  //     isFollowing: false,
  //   },
  //   {
  //     id: 5,
  //     nickname: "김태현",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaINYL0wk4kJL6u0AC2NMAd6eL0I7u3QmnxQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 6,
  //     nickname: "김도훈",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H9zWNDYaZaukidKZ-exc3X-2mt1HThBteQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 7,
  //     nickname: "전호정",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWx-k-_VAcLjN8c11jfHrc0jYDZ_JciPdPg&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 8,
  //     nickname: "양지훈",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20HqpN3jmay7YPuO9FnBJ9y7N9KE2E-62lQ&usqp=CAU",
  //     isFollowing: false,
  //   },
  //   {
  //     id: 9,
  //     nickname: "정성우",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW85_cRjVdLJcljHMN6LZ9kbhoojf2Sxd8uQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 10,
  //     nickname: "강동옥",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFA53irlX3ztfUplBdBwf9mMvDCksTleKpg&usqp=CAU",
  //     isFollowing: true,
  //   },
  //   {
  //     id: 11,
  //     nickname: "김태현",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaINYL0wk4kJL6u0AC2NMAd6eL0I7u3QmnxQ&usqp=CAU",
  //     isFollowing: false,
  //   },
  //   {
  //     id: 12,
  //     nickname: "김도훈",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H9zWNDYaZaukidKZ-exc3X-2mt1HThBteQ&usqp=CAU",
  //     isFollowing: true,
  //   },
  // ];
  // if (option === 0) {
  //   // setOptionList(followerList);
  //   setTitle("팔로워");
  // } else {
  //   // setOptionList(followingList);
  //   setTitle("팔로잉");
  // }
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
                // setOption(0);
              }}
            >
              {follower}
            </td>
            <td></td>
            <td
              onClick={() => {
                setOpen(true);
                // setOption(1);
              }}
            >
              {following}
            </td>
          </tr>
        </tbody>
      </div>
      {open && (
        <FollowModal
          open={open}
          setOpen={() => setOpen(false)}
          contentList={followerList}
          title="팔로워"
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
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(FollowFollower);
