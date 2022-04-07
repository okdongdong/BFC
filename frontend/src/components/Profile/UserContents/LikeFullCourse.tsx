import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Paper } from "@mui/material";
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
function Like({ likeList, nickname }: Props) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const title = `${nickname}님이 좋아하는 코스`;
  const type = 0;
  let baseCard = [];
  for (let i = 0; i < 6; i++) {
    if (i < likeList.length) {
      baseCard.push(
        <CardStyle
          onClick={() =>
            navigate(`/fullcourseDetail/${likeList[i].fullCourseId}`)
          }
        >
          <CardActionArea>
            <FullCouresThumbnail
              thumbnailList={likeList[i].thumbnailList}
            ></FullCouresThumbnail>
            <CardContentStyle>
              <Box sx={{ alignItems: "center" }}>
                <LikeCount likeCount={likeList[i].likeCnt}></LikeCount>
                <FullCourseNameStyle>{likeList[i].title}</FullCourseNameStyle>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <DateCounter
                startedOn={new Date(likeList[i].startedOn)}
                finishedOn={new Date(likeList[i].finishedOn)}
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
