import { useState } from "react";
import axios from "axios";
import TextFieldWithButton from "./TextFieldWithButton";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  username: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
  birthday: Date | null;
  gender: number; // 남자: 1, 여자: 0
  agreement: boolean; // 약관동의
  profileimg?: string | null;
  [key: string]: any; // 이거를 쓰면 ts를 쓰는 의미가 없긴한데 일단 오류를 해결하기 위해 사용
}

function SignupForm() {
  const classes = useStyles();

  // 유저정보 기본값
  const initUserInfo: UserInfo = {
    username: "",
    password: "",
    passwordConfirmation: "",
    nickname: "",
    birthday: null,
    gender: 1,
    agreement: false,
    profileimg: null,
  };

  // 유저정보 state
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);

  // 인증관련 state
  const [emailConfirmation, setEmailConfirmation] = useState<boolean>(false);
  const [nicknameConfirmation, setNicknameConfirmation] =
    useState<boolean>(false);
  const [sendEmailConfirmation, setSendEmailConfirmation] =
    useState<boolean>(false);
  const [sendCheckNickname, setSendCheckNickname] = useState<boolean>(false);
  const [userCertificationNumber, setUserCertificationNumber] =
    useState<number>(0);
  const [responseCertificationNumber, setResponseCertificationNumber] =
    useState<number>(0);

  // 유효성 검사 처리
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [nickNameMessage, setNickNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");

  // 회원가입 요청전송
  function requestSignup(userInfo: UserInfo): void {
    console.log(userInfo);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/signup`,
      data: userInfo,
    })
      .then((res) => console.log(res)) // redux로 저장해서 사용해야할듯
      .catch((err) => console.log(err));
  }

  // 이메일 인증요청
  function requsetEmailConfirmation(): void {
    // 버튼을 다시누르는 경우 다시인증해야함
    if (sendEmailConfirmation) {
      setSendEmailConfirmation(() => false);
      setEmailConfirmation(() => false);
    } else {
      // 인증
      console.log("이메일 인증요청");
      console.log(userInfo);
      setSendEmailConfirmation(() => true);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/email/verification`,
        data: { email: userInfo.username },
      })
        .then((res) => {
          console.log(`인증번호 수신 : ${res.data.certificationNumber}`);
          setResponseCertificationNumber(() => res.data.certificationNumber);
        })
        .catch((err) => {
          console.log("이메일 인증 실패", err);
          // setSendEmailConfirmation(() => false);
        });
    }
  }

  // 닉네임 중복검사요청
  function requsetCheckNickname(): void {
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

  // 회원가입폼 정보입력
  function changeUserInfo(event: React.ChangeEvent<HTMLInputElement>): void {
    const newUserInfo: UserInfo = { ...userInfo };
    const targetId: string = event.target.id;
    newUserInfo[targetId] = event.target.value;
    setUserInfo(() => newUserInfo);

    // 유효성 검사
    switch (targetId) {
      case "username":
        const emailRegex =
          /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!newUserInfo.username || emailRegex.test(newUserInfo.username)) {
          setEmailMessage("");
        } else {
          setEmailMessage("이메일 형식이 틀렸습니다.");
        }
        break;
      case "password":
        // 비밀번호 유효성 검사
        const passwordRegex =
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!newUserInfo.password || passwordRegex.test(newUserInfo.password)) {
          setPasswordMessage("");
        } else {
          setPasswordMessage(
            "숫자+영문자+특수문자 조합으로 8자리이상 입력하세요."
          );
        }
        // 비밀번호 확인 일치검사
        if (
          !newUserInfo.passwordConfirmation ||
          newUserInfo.password === newUserInfo.passwordConfirmation
        ) {
          setPasswordConfirmMessage("");
        } else {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        }

        break;
      case "passwordConfirmation":
        if (
          !newUserInfo.passwordConfirmation ||
          newUserInfo.password === newUserInfo.passwordConfirmation
        ) {
          setPasswordConfirmMessage("");
        } else {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        }
        break;
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

    console.log(userInfo);
  }

  // 이메일 인증번호 입력
  function changeUserCertificationNumber(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const newUserCertificationNumber: number = parseInt(event.target.value);
    setUserCertificationNumber(() => newUserCertificationNumber);
    if (
      userCertificationNumber !== 0 &&
      userCertificationNumber === responseCertificationNumber
    ) {
      setEmailConfirmation(() => true);
    } else {
      setEmailConfirmation(() => false);
    }
  }

  // 약관동의
  function checkAgreement(event: React.ChangeEvent<HTMLInputElement>): void {
    const newUserInfo: UserInfo = { ...userInfo };
    newUserInfo.agreement = event.target.checked;
    setUserInfo(() => newUserInfo);
    console.log(userInfo);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate>
          <TextFieldWithButton
            label="이메일"
            id="username"
            autoComplete="email"
            onChange={changeUserInfo}
            onClickButton={requsetEmailConfirmation}
            buttonText="인증번호발송"
            disabled={sendEmailConfirmation}
            helperText={emailMessage}
          ></TextFieldWithButton>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="certificationNumber"
            label="인증번호"
            type="text"
            name="certificationNumber"
            onChange={changeUserCertificationNumber}
          />
          <TextField
            error={!!passwordMessage}
            helperText={passwordMessage}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changeUserInfo}
          />
          <TextField
            error={!!passwordConfirmMessage}
            helperText={passwordConfirmMessage}
            variant="outlined"
            margin="normal"
            fullWidth
            name="passwordConfirmation"
            label="비밀번호 확인"
            type="password"
            id="passwordConfirmation"
            onChange={changeUserInfo}
          />
          <TextFieldWithButton
            label="닉네임"
            id="nickname"
            onChange={changeUserInfo}
            onClickButton={requsetCheckNickname}
            buttonText="닉네임중복확인"
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
            value={userInfo.birthday || "2022-02-02"} // 생년월일 입력하지 않았을 때 기본값
            onChange={changeUserInfo}
          />

          <FormControlLabel
            control={
              <Checkbox
                id="agreement"
                onChange={checkAgreement}
                color="primary"
              />
            }
            label="약관동의"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => requestSignup}
            disabled={
              userInfo.password !== userInfo.passwordConfirmation ||
              userInfo.username === "" ||
              userInfo.password === "" ||
              userInfo.passwordConfirmation === "" ||
              userInfo.nickname === "" ||
              userInfo.agreement === false ||
              emailConfirmation === false ||
              nicknameConfirmation === false
            }
          >
            회원가입
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignupForm;
