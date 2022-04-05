import {
  Button,
  Container,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toStringByFormatting } from "../../../layouts/CreateFullCourseNavbar";
import { creatNewFullCourse } from "../../../redux/createFullCourse/actions";
import { CreateFullCourseRequestData } from "../../../redux/createFullCourse/types";

import DatePicker from "../CreateFullCourse/DatePicker";
import CompanionList from "./CompanionList";
import IsPublicButton from "./IsPublicButton";
import WishKeywordList from "./WishKeywordList";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: "flex",
    justifyContent: "left",
    marginTop: theme.spacing(1),
    width: "100%",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btn: {
    backgroundColor: "#fae300",
  },
  logo: {
    marginRight: "10px",
  },
}));

function PreSuveyContainer({
  fullCourseDate,
  fullCourseId,
  userId,
  creatNewFullCourse,
}: Props) {
  const [title, setTitle] = useState<string>("나의 풀코스");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [meogEoBoJaList, setMeogEoBoJaList] = useState<Array<string>>([]);
  const [gaBoJaList, setGaBoJa] = useState<Array<string>>([]);
  // const [companionList, setCompanionList] = useState<Array<string>>([]);

  const classes = useStyles();
  const navigate = useNavigate();

  // 풀코스 제목 변경 핸들러
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // 풀코스 생성버튼 핸들러
  const onClickHandler = () => {
    const startedOn = toStringByFormatting(fullCourseDate[0]);
    const finishedOn = toStringByFormatting(fullCourseDate[1]);

    const data: CreateFullCourseRequestData = {
      title: title,
      isPublic: isPublic,
      startedOn: startedOn,
      finishedOn: finishedOn,
      wishFoodKeywords: meogEoBoJaList,
      wishPlaceKeywords: gaBoJaList,
      userId: userId,
    };

    creatNewFullCourse(data);
  };

  useEffect(() => {
    if (fullCourseId) {
      navigate("/fullcourse/create");
    }
  }, [fullCourseId]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Stack>
            <div className={classes.form}>
              <span>공개범위</span>
              <IsPublicButton setIsPublic={setIsPublic}></IsPublicButton>
            </div>
            <Typography component="h1" variant="h5">
              풀코스 만들기
            </Typography>
            <TextField
              label="풀코스이름을 입력하세요"
              onChange={onChangeHandler}
            ></TextField>
            <h3>여행기간</h3>
            <DatePicker></DatePicker>
            <WishKeywordList
              listLabel={"가고싶어요"}
              wishKeywordList={meogEoBoJaList}
              setWishKeywordList={setMeogEoBoJaList}
            ></WishKeywordList>
            <WishKeywordList
              listLabel={"먹고싶어요"}
              wishKeywordList={gaBoJaList}
              setWishKeywordList={setGaBoJa}
            ></WishKeywordList>
            <Button onClick={onClickHandler}>풀코스 생성</Button>
          </Stack>
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = ({ createFullCourse, account }: any) => {
  return {
    fullCourseDate: createFullCourse.fullCourseDate,
    fullCourseId: createFullCourse.fullCourseId,
    userId: account.userId,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    creatNewFullCourse: (fullCourseInfo: CreateFullCourseRequestData) =>
      dispatch(creatNewFullCourse(fullCourseInfo)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(PreSuveyContainer);
