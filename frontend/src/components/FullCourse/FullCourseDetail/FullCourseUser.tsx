import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  myImg: {
    borderRadius: theme.spacing(100),
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft: "5px",
  },
}));
export default function FullCourseUser() {
  const classes = useStyles();
  const seeCount: number = 1000;
  const likeCount: number = 93;
  const username: string = "꽃가루를날려";
  const profileImg: string =
    "https://cdn.gukjenews.com/news/photo/202110/2328684_2319618_5032.png";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: "25rem",
        marginTop: "40px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ margin: "5px" }}>조회수</p>
        <p style={{ color: "blue" }}>{seeCount}</p>
        <p style={{ marginLeft: "20px", marginRight: "5px" }}>좋아요</p>
        <p style={{ color: "blue" }}>{likeCount}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "25rem",
        }}
      >
        {username}
        <img src={profileImg} className={classes.myImg} alt="" />
      </div>
    </div>
  );
}
