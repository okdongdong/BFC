import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
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
function FollowFollower() {
  const [open, setOpen] = React.useState(false);
  // const [option, setOption] = React.useState(0);
  // const [optionList, setOptionList] = React.useState(Array<person>());

  const [title, setTitle] = React.useState("");
  const classes = useStyles();
  const follower: number = 988;
  const following: number = 0;
  const followingList: Array<person> = [
    {
      id: 1,
      nickname: "전호정",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWx-k-_VAcLjN8c11jfHrc0jYDZ_JciPdPg&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 2,
      nickname: "양지훈",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20HqpN3jmay7YPuO9FnBJ9y7N9KE2E-62lQ&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 3,
      nickname: "정성우",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW85_cRjVdLJcljHMN6LZ9kbhoojf2Sxd8uQ&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 4,
      nickname: "강동옥",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFA53irlX3ztfUplBdBwf9mMvDCksTleKpg&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 5,
      nickname: "김태현",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaINYL0wk4kJL6u0AC2NMAd6eL0I7u3QmnxQ&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 6,
      nickname: "김도훈",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H9zWNDYaZaukidKZ-exc3X-2mt1HThBteQ&usqp=CAU",
      isFollowing: true,
    },
  ];
  const followerList: Array<person> = [
    {
      id: 1,
      nickname: "전호정",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWx-k-_VAcLjN8c11jfHrc0jYDZ_JciPdPg&usqp=CAU",
      isFollowing: false,
    },
    {
      id: 2,
      nickname: "양지훈",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20HqpN3jmay7YPuO9FnBJ9y7N9KE2E-62lQ&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 3,
      nickname: "정성우",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW85_cRjVdLJcljHMN6LZ9kbhoojf2Sxd8uQ&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 4,
      nickname: "강동옥",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFA53irlX3ztfUplBdBwf9mMvDCksTleKpg&usqp=CAU",
      isFollowing: false,
    },
    {
      id: 5,
      nickname: "김태현",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaINYL0wk4kJL6u0AC2NMAd6eL0I7u3QmnxQ&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 6,
      nickname: "김도훈",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H9zWNDYaZaukidKZ-exc3X-2mt1HThBteQ&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 7,
      nickname: "전호정",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWx-k-_VAcLjN8c11jfHrc0jYDZ_JciPdPg&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 8,
      nickname: "양지훈",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20HqpN3jmay7YPuO9FnBJ9y7N9KE2E-62lQ&usqp=CAU",
      isFollowing: false,
    },
    {
      id: 9,
      nickname: "정성우",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW85_cRjVdLJcljHMN6LZ9kbhoojf2Sxd8uQ&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 10,
      nickname: "강동옥",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFA53irlX3ztfUplBdBwf9mMvDCksTleKpg&usqp=CAU",
      isFollowing: true,
    },
    {
      id: 11,
      nickname: "김태현",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaINYL0wk4kJL6u0AC2NMAd6eL0I7u3QmnxQ&usqp=CAU",
      isFollowing: false,
    },
    {
      id: 12,
      nickname: "김도훈",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H9zWNDYaZaukidKZ-exc3X-2mt1HThBteQ&usqp=CAU",
      isFollowing: true,
    },
  ];
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
export default FollowFollower;
