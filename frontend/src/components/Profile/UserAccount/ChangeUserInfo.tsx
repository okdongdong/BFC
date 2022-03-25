import { useState } from "react";
import axios from "axios";
import TextFieldWithButton from "../../Accounts/TextFieldWithButton";
import {
  Button,
  ButtonGroup,
  Container,
  TextField,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteAccount from "./DeleteAccount";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface UserInfo {
  user_id: number;
  username: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
  birthday: string;
  gender: number; // 남자: 1, 여자: 0
  [key: string]: any; // 이거를 쓰면 ts를 쓰는 의미가 없긴한데 일단 오류를 해결하기 위해 사용
}
function ChangeUserInfo() {
  const classes = useStyles();

  // 유저정보 기본값
  const initUserInfo: UserInfo = {
    user_id: 1,
    username: "jhj20071@naver.com",
    password: "jj12341234!",
    passwordConfirmation: "jj12341234!",
    nickname: "ho빵",
    birthday: "1998-03-11",
    gender: 0,
  };

  //   console.log(initUserInfo);

  // 유저정보 state
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);

  // 인증관련 state
  const [nicknameConfirmation, setNicknameConfirmation] =
    useState<boolean>(false);
  const [sendCheckNickname, setSendCheckNickname] = useState<boolean>(false);

  // 유효성 검사 처리
  const [nickNameMessage, setNickNameMessage] = useState<string>("");

  // 회원정보수정요청
  function requestChangeUser(userInfo: UserInfo): void {
    console.log(userInfo);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/${userInfo.user_id}`,
      data: userInfo,
    })
      .then((res) => console.log(res)) // redux로 저장해서 사용해야할듯
      .catch((err) => console.log(err));
  }
  //테스트할때 적용
  function getUserData(): void {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/${userInfo.user_id}`,
      params: { nickname: userInfo.nickname },
    }).then((res) => {
      setUserInfo(() => res.data);
    });
  }

  // 닉네임 중복검사요청
  function requestCheckNickname(): void {
    // 닉네임 재작성
    if (sendCheckNickname) {
      setSendCheckNickname(() => false);
      setNicknameConfirmation(() => false);
    } else {
      // 닉네임 인증
      console.log("닉네임 중복검사 요청");
      console.log(userInfo);
      setSendCheckNickname(() => true);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/nickname`,
        params: { nickname: userInfo.nickname },
      })
        .then((res) => {
          setNicknameConfirmation(() => true);
          console.log(res);
        })
        .catch((err) => {
          // setSendCheckNickname(() => false);
          console.log(err);
        });
    }
  }

  // 성별버튼
  function selectGender(gender: number): void {
    const newUserInfo: UserInfo = { ...userInfo };
    if (gender === 1) {
      newUserInfo.gender = 1;
      setUserInfo(() => newUserInfo);
    } else {
      newUserInfo.gender = 0;
      setUserInfo(() => newUserInfo);
    }
  }

  // 회원정보수정폼 정보입력
  function changeUserInfo(event: React.ChangeEvent<HTMLInputElement>): void {
    const newUserInfo: UserInfo = { ...userInfo };
    const targetId: string = event.target.id;
    newUserInfo[targetId] = event.target.value;
    setUserInfo(() => newUserInfo);

    // 유효성 검사
    switch (targetId) {
      case "nickname":
        if (
          newUserInfo.nickname.length < 2 ||
          newUserInfo.nickname.length > 8
        ) {
          setNickNameMessage("닉네임은 2글자 이상 8글자 이하로 입력해 주세요");
        } else {
          setNickNameMessage("");
        }

        break;

      default:
        return;
    }
    console.log(newUserInfo);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            disabled
            variant="filled"
            margin="normal"
            fullWidth
            id="certificationNumber"
            label="이메일"
            defaultValue={initUserInfo.username}
            type="text"
            name="certificationNumber"
          />

          <TextFieldWithButton
            label="닉네임"
            id="nickname"
            onChange={changeUserInfo}
            onClickButton={requestCheckNickname}
            buttonText="닉네임중복확인"
            value={userInfo.nickname}
            disabled={sendCheckNickname}
            helperText={nickNameMessage}
          ></TextFieldWithButton>
          <ButtonGroup
            color="primary"
            aria-label="primary button group"
            className={classes.form}
          >
            <Button
              variant={userInfo.gender === 1 ? "contained" : "outlined"}
              onClick={() => selectGender(1)}
            >
              남
            </Button>
            <Button
              variant={userInfo.gender === 0 ? "contained" : "outlined"}
              onClick={() => selectGender(0)}
            >
              여
            </Button>
          </ButtonGroup>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="birthday"
            label="생년월일"
            type="date"
            id="birthday"
            defaultValue={userInfo.birthday}
            onChange={changeUserInfo}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => requestChangeUser}
            disabled={nicknameConfirmation === false}
          >
            정보수정
          </Button>
          <DeleteAccount></DeleteAccount>
        </form>
      </div>
    </Container>
  );
}

export default ChangeUserInfo;
