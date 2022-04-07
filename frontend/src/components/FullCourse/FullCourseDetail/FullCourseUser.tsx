import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  myImg: {
    borderRadius: theme.spacing(100),
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft: "5px",
  },
}));
function FullCourseUser({
  view,
  likeCnt,
  start,
  end,
  nickname,
  profileImg,
}: Props) {
  const classes = useStyles();
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
        <p style={{ color: "blue" }}>{view}</p>
        <p style={{ marginLeft: "20px", marginRight: "5px" }}>좋아요</p>
        {likeCnt === null ? (
          <p style={{ color: "blue" }}>0</p>
        ) : (
          <>
            <p style={{ color: "blue" }}>{likeCnt}</p>
          </>
        )}
        <p style={{ marginLeft: "20px", marginRight: "5px" }}>여행기간</p>
        <p style={{ color: "blue" }}>
          {start}~{end}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "25rem",
        }}
      >
        {nickname}
        <img src={profileImg} className={classes.myImg} alt="" />
      </div>
    </div>
  );
}
const mapStateToProps = ({ fullCourse }: any) => {
  return {
    view: fullCourse.view,
    likeCnt: fullCourse.likeCnt,
    start: fullCourse.startedOn,
    end: fullCourse.finishedOn,
    nickname: fullCourse.nickname,
    profileImg: fullCourse.profileImg,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(FullCourseUser);
