import {
  Box,
  Button,
  Collapse,
  Container,
  FormGroup,
  Stack,
  styled,
  Switch,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toStringByFormatting } from "../../../layouts/CreateFullCourseNavbar";
import {
  WISH_FOOD_KEYWORD_LIST,
  WISH_PLACE_KEYWORD_LIST,
} from "../../../lib/preSurveyLabels";
import { creatNewFullCourse } from "../../../redux/createFullCourse/actions";
import { CreateFullCourseRequestData } from "../../../redux/createFullCourse/types";

import DatePicker from "../CreateFullCourse/DatePicker";
import CompanionList from "./CompanionList";
import IsPublicButton from "./IsPublicButton";
import SelectWishKeyword from "./SelectWishKeyword";
import WishKeywordList from "./WishKeywordList";

import kkilook from "../../../assets/img/kkilook.png";
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: theme.spacing(2),
    borderRadius: 15,
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

const SelectKeywordTitle = styled("div")({
  fontSize: 24,
  fontWeight: "bold",
});
const WishBox = styled("div")({
  fontSize: 16,
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
});

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export interface WishKeyword {
  keyword: string;
  checked: boolean;
  index: number;
}

const calSelectList = (keywordList: string[]) => {
  const temp: WishKeyword[] = [];
  keywordList.map((keyword: string, idx: number) => {
    temp.push({ keyword: keyword, checked: false, index: idx });
  });
  return temp;
};

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

  const [nowKeyword, setNowKeyword] = useState("");
  const [selectWishFoodList, setSelectWishFoodList] = useState<WishKeyword[]>(
    []
  );
  const [selectWishPlaceList, setSelectWishPlaceList] = useState<WishKeyword[]>(
    []
  );

  useEffect(() => {
    setSelectWishFoodList(calSelectList(WISH_FOOD_KEYWORD_LIST));
    setSelectWishPlaceList(calSelectList(WISH_PLACE_KEYWORD_LIST));
  }, []);

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
    navigate("/fullcourse/create");
  };

  return (
    <div>
      <Container component="main" maxWidth="md" sx={{ position: "relative" }}>
        <Collapse
          sx={{ position: "absolute", right: 80, top: 80, zIndex: 1000 }}
          in={nowKeyword === ""}
          orientation="horizontal"
        >
          <img src={kkilook} alt="끼룩" style={{ width: 200 }} />
        </Collapse>
        <Stack direction="row" spacing={2}>
          <div className={classes.paper}>
            <Stack>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <SelectKeywordTitle>풀코스 만들기</SelectKeywordTitle>
                <br />
                <FormGroup>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>비공개</Typography>
                    <AntSwitch
                      inputProps={{ "aria-label": "ant design" }}
                      checked={isPublic}
                      onChange={() => setIsPublic(!isPublic)}
                    />
                    <Typography>공개</Typography>
                  </Stack>
                </FormGroup>
              </div>
              <TextField
                label="풀코스이름을 입력하세요"
                onChange={onChangeHandler}
              ></TextField>
              <br />
              <DatePicker></DatePicker>

              <WishBox>
                <div>가고싶어요</div>
                <Button
                  onClick={() =>
                    nowKeyword === "place"
                      ? setNowKeyword("")
                      : setNowKeyword("place")
                  }
                >
                  추가
                </Button>
              </WishBox>
              <WishKeywordList
                wishKeywordList={gaBoJaList}
                setWishKeywordList={setGaBoJa}
              ></WishKeywordList>
              <br />
              <WishBox>
                <div>먹고싶어요</div>
                <Button
                  onClick={() =>
                    nowKeyword === "food"
                      ? setNowKeyword("")
                      : setNowKeyword("food")
                  }
                >
                  추가
                </Button>
              </WishBox>
              <WishKeywordList
                wishKeywordList={meogEoBoJaList}
                setWishKeywordList={setMeogEoBoJaList}
              ></WishKeywordList>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 32,
                }}
              >
                <Button onClick={() => navigate(-1)} color="error">
                  돌아가기
                </Button>
                <Button onClick={onClickHandler}>풀코스 생성</Button>
              </div>
            </Stack>
          </div>
          <Collapse in={nowKeyword !== ""}>
            <div className={classes.paper}>
              {nowKeyword === "food" ? (
                <div style={{ width: "100%" }}>
                  <SelectKeywordTitle>먹고싶어요</SelectKeywordTitle>
                  <hr />
                  <SelectWishKeyword
                    keywordList={selectWishFoodList}
                    setKeywordList={setMeogEoBoJaList}
                  ></SelectWishKeyword>
                </div>
              ) : nowKeyword === "place" ? (
                <div style={{ width: "100%" }}>
                  <SelectKeywordTitle>가고싶어요</SelectKeywordTitle>
                  <hr />
                  <SelectWishKeyword
                    keywordList={selectWishPlaceList}
                    setKeywordList={setGaBoJa}
                  ></SelectWishKeyword>
                </div>
              ) : (
                <div style={{ width: 100, height: 500 }}></div>
              )}
            </div>
          </Collapse>
        </Stack>
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
