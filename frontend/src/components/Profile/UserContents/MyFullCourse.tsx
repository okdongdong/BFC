import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Paper } from "@mui/material";
import FullCourseModal from "./Modal/FullCourseModal";
import { connect } from "react-redux";
interface place {
  fullcourse_id: number;
  name: string;
  thumbnail: string;
  label: string;
}
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
  text: {
    position: "absolute",
    textAlign: "center",
  },
}));
function MyFullCourse({ myList, nickname }: Props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const title = `${nickname}님의 풀코스`;
  const type = 1;
  let baseCard = [];
  for (let i = 0; i < 6; i++) {
    if (i < myList.length) {
      baseCard.push(
        <div key={i} style={{ position: "relative" }}>
          <img
            style={{
              width: "200px",
              height: "200px",
              marginRight: "10px",
              marginLeft: "10px",
              borderRadius: "10px",
            }}
            src={myList[i].thumbnail}
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
            <p style={{ color: "white" }}>#{myList[i].label}</p>
          </div>
        </div>
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
    myList: profile.myList,
    nickname: profile.nickname,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(MyFullCourse);
