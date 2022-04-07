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
const CardStyle = styled(Card)(() => ({
  width: 220,
  borderRadius: "25px",
  textAlign: "left",
  marginRight: 15,
  marginLeft: 15,
}));

const CardContentStyle = styled(CardContent)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const FullCourseNameStyle = styled("h2")(() => ({
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
      console.log("내풀코스다!!!", myList[i]);
      baseCard.push(
        <CardStyle
          onClick={() =>
            navigate(`/fullcourseDetail/${myList[i].fullCourseId}`)
          }
        >
          <CardActionArea>
            <FullCouresThumbnail
              thumbnailList={myList[i].thumbnailList}
            ></FullCouresThumbnail>
            <CardContentStyle>
              <Box sx={{ alignItems: "center" }}>
                <LikeCount likeCount={myList[i].likeCnt}></LikeCount>
                <FullCourseNameStyle>{myList[i].title}</FullCourseNameStyle>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <DateCounter
                startedOn={new Date(myList[i].startedOn)}
                finishedOn={new Date(myList[i].finishedOn)}
              ></DateCounter>
            </CardContentStyle>
          </CardActionArea>
        </CardStyle>
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
