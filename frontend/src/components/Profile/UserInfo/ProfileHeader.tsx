import BadgeItem from "./Badge";
import Profileimg from "./ProfileImg";
import ProfileInfo from "./ProfileInfo";
import FollowFollower from "./FollowFollower";
import { orange } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  bg: {
    height: theme.spacing(15),
    backgroundColor: orange[500],
    position: "relative",
  },
  myImg: {
    marginTop: theme.spacing(7),
    position: "absolute",
    margin: theme.spacing(0, 52, 0),
  },
  myInfo: {
    float: "left",
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(68),
    position: "absolute",
  },
  badges: {
    marginLeft: theme.spacing(67.5),
    marginTop: theme.spacing(7),
    position: "absolute",
  },
  followfollower: {
    marginTop: theme.spacing(6),
    float: "right",
    marginRight: theme.spacing(50),
  },
}));
function ProfileHeader() {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <div className={classes.followfollower}>
        <FollowFollower></FollowFollower>
      </div>
      <div className={classes.myImg}>
        <Profileimg></Profileimg>
        {/* <ProfileName></ProfileName> */}
      </div>
      <div className={classes.badges}>
        <BadgeItem></BadgeItem>
      </div>
      <div className={classes.myInfo}>
        <ProfileInfo></ProfileInfo>
      </div>
    </div>
  );
}
export default ProfileHeader;
