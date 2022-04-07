import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Theme, Paper, styled, Stack, Chip, Button } from "@mui/material";
import PlaceModal from "./Modal/PlaceModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarScore from "../../Main/StarScore";
import PlaceCard from "../../Main/PlaceCard";
import noImage from "../../../assets/img/logo_with_text.png";

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
}));

function LikePlace({ interestList, profileUserId }: Props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const title = "관심 장소";
  let baseCard = [];
  for (let i = 0; i < 6; i++) {
    if (i < interestList.length) {
      baseCard.push(
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Link
            to={`/place/${interestList[i].placeId}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                width: "220px",
                height: "220px",
                marginRight: "15px",
                marginLeft: "15px",
                borderRadius: "25px",
              }}
            >
              {interestList[i].thumbnail ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={interestList[i].thumbnail}
                  alt="green iguana"
                />
              ) : (
                <CardMedia
                  component="img"
                  height="140"
                  image="https://www.chanchao.com.tw/images/default.jpg" //default 이미지 등록!!!!!!!!!
                  alt="green iguana"
                />
              )}

              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  {interestList[i].name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontSize: "15px" }}
                >
                  <StarScore
                    starScore={interestList[i].averageScore.toFixed(2)}
                  ></StarScore>
                </Typography>
              </CardContent>
            </Card>
          </Link>
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
        <PlaceModal
          open={open}
          setOpen={() => setOpen(false)}
          title={title}
        ></PlaceModal>
      )}
    </div>
  );
}
const mapStateToProps = ({ account, profile }: any) => {
  return {
    isLogin: account.isLogin,
    interestList: profile.interestList,
    profileUserId: profile.userId,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(LikePlace);
