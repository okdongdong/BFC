import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReviewProps } from "../../../types/review";
const useStyles = makeStyles((theme: Theme) => ({
  myImg: {
    borderRadius: theme.spacing(100),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));
const Reviewer = ({ nickname, profile }: ReviewProps) => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={profile} className={classes.myImg} alt="" />
      <p style={{ marginLeft: "7px" }}>{nickname}</p>
    </div>
  );
};
export default Reviewer;
