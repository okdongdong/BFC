import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  follow: {
    fontSize: 20,
    fontWeight: "bold",
    width: 200,
    height: 20,
  },
}));
function FollowFollower() {
  const classes = useStyles();
  const follower: number = 988;
  const following: number = 0;
  return (
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
          <td>{follower}</td>
          <td></td>
          <td>{following}</td>
        </tr>
      </tbody>
    </div>
  );
}
export default FollowFollower;
