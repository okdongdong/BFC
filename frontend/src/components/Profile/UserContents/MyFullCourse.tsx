import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Paper, Button } from "@mui/material";
import FullCourseModal from "./Modal/FullCourseModal";
import { connect } from "react-redux";
import { Box, Card, CardActionArea, CardContent, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FullCouresThumbnail from "../../Main/FullCourseThumbnail";
import LikeCount from "../../Main/LikeCount";
import DateCounter from "../../Main/DateCounter";
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "220px",
    height: "200px",
    margin: "15px",
    paddingRight: "0",
    paddingBottom: "0",
    paddingTop: "0",
    paddingLeft: "0",
    backgroundColor: " rgba(133,133,133,0.5)",
  },
  text: {
    position: "absolute",
    textAlign: "center",
  },
  bg: {
    backgroundColor: " rgba(133,133,133,0.5)",
  },
}));
const CardStyle = styled(Card)(() => ({
  width: 220,
  borderRadius: "25px",
  textAlign: "left",
  marginRight: 15,
  marginLeft: 15,
}));

const CardContentStyle = styled(CardContent)(() => ({
  display: "flex",
  width: "100%",

  justifyContent: "space-between",
  color: "white",
  position: "absolute",
  marginTop: "-100px",
  // backgroundColor: "white",
  backgroundColor: " rgba(0,0,0,0.5)",
}));

const FullCourseNameStyle = styled("h3")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
}));
function MyFullCourse({ myList, nickname }: Props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const title = `${nickname}님의 풀코스`;
  const type = 1;
  let baseCard = [];
  const navigate = useNavigate();
  for (let i = 0; i < 6; i++) {
    if (i < myList.length) {
      baseCard.push(
        <CardStyle
          onClick={() =>
            navigate(`/fullcourseDetail/${myList[i].fullCourseId}`)
          }
        >
          <div style={{ position: "relative" }}>
            <CardActionArea>
              <div className={classes.bg}>
                <FullCouresThumbnail
                  thumbnailList={myList[i].thumbnailList}
                ></FullCouresThumbnail>
                <CardContentStyle>
                  <Box sx={{ alignItems: "center" }}>
                    <LikeCount likeCount={myList[i].likeCnt}></LikeCount>
                    <FullCourseNameStyle>{myList[i].title}</FullCourseNameStyle>
                  </Box>

                  <DateCounter
                    startedOn={new Date(myList[i].startedOn)}
                    finishedOn={new Date(myList[i].finishedOn)}
                  ></DateCounter>
                  <div></div>
                </CardContentStyle>
              </div>
            </CardActionArea>
          </div>
        </CardStyle>
      );
    } else {
      baseCard.push(
        <Paper elevation={3} className={classes.paper}>
          <div style={{ marginTop: "auto", marginBottom: "auto" }}></div>
        </Paper>
      );
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
        <Button
          variant="outlined"
          size="small"
          style={{ float: "right", marginRight: "300px" }}
          onClick={() => setOpen(true)}
        >
          더보기
        </Button>
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
