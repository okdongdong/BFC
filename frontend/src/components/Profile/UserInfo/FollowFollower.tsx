import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
