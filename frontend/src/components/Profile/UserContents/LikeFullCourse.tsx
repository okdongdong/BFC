import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Paper } from "@mui/material";
import FullCourseModal from "./Modal/FullCourseModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "200px",
    height: "200px",
    margin: "10px",
    paddingRight: "0",
    paddingBottom: "0",
    paddingTop: "0",
    paddingLeft: "0",
  },
}));
function Like({ likeList, nickname }: Props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const title = `${nickname}님이 좋아하는 코스`;
  const type = 0;
  let baseCard = [];
  for (let i = 0; i < 6; i++) {
    if (i < likeList.length) {
      baseCard.push(
        <Link
          to={`/place/${likeList[i].placeId}`}
          style={{ textDecoration: "none" }}
        >
          <div style={{ position: "relative" }}>
            <img
              style={{
                width: "200px",
                height: "200px",
                marginRight: "10px",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
              src={likeList[i].thumbnail}
              alt="fullCourseImg"
            ></img>
            <div
              style={{
                width: "200px",
                height: "200px",
                marginRight: "10px",
                marginLeft: "10px",
                borderRadius: "10px",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                top: 0,
                left: 0,
              }}
            >
              <p style={{ color: "white" }}>#{likeList[i].label}</p>
            </div>
          </div>
        </Link>
      );
    } else {
      baseCard.push(<Paper elevation={3} className={classes.paper}></Paper>);
    }
  }

  return (
    <div>
      <p
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "left",
          marginLeft: "300px",
        }}
      >
        {title}
        <button
          style={{ float: "right", marginRight: "300px" }}
          onClick={() => setOpen(true)}
        >
          더보기
        </button>
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {baseCard}
      </div>
      {open && (
        <FullCourseModal
          open={open}
          setOpen={() => setOpen(false)}
          title={title}
          type={type}
        ></FullCourseModal>
      )}
    </div>
  );
}
const mapStateToProps = ({ account, profile }: any) => {
  return {
    isLogin: account.isLogin,
    likeList: profile.likeList,
    nickname: profile.nickname,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Like);
