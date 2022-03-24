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
import { useNavigate } from "react-router-dom";
import { SignupUserInfo } from "../../types/account";

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

function SignupForm() {
  const classes = useStyles();
  const navigate = useNavigate();

  // 유저정보 기본값
  const initUserInfo: SignupUserInfo = {
    username: "",
    password: "",
    passwordConfirmation: "",
    nickname: "",
    birthday: null,
    gender: 1,
    agreement: false,
    profileImg: null,
  };

  // 유저정보 state
  const [userInfo, setUserInfo] = useState<SignupUserInfo>(initUserInfo);

  // 인증관련 state
  const [emailConfirmation, setEmailConfirmation] = useState<boolean>(false);
  const [nicknameConfirmation, setNicknameConfirmation] =
    useState<boolean>(false);
  const [sendEmailConfirmation, setSendEmailConfirmation] =
    useState<boolean>(false);
  const [sendCheckNickname, setSendCheckNickname] = useState<boolean>(false);
  const [userCertificationNumber, setUserCertificationNumber] =
    useState<string>("");
  const [responseCertificationNumber, setResponseCertificationNumber] =
    useState<string>("");

  // 유효성 검사 처리
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [emailConfirmMessage, setEmailConfirmMessage] = useState<string>("");
  const [nickNameMessage, setNickNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");

  // 회원가입 요청전송
  function requestSignup(): void {
    console.log(userInfo);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/signup`,
      data: {
        username: userInfo.username,
        password: userInfo.password,
        passwordCheck: userInfo.passwordConfirmation,
        nickname: userInfo.nickname,
        birthday: userInfo.birthday,
        gender: userInfo.gender,
        // agreement: userInfo.agreement,
      },
    })
      .then((res) => {
        console.log(res);
        navigate("main");
      }) // redux로 저장해서 사용해야할듯
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
          console.log(`인증번호 수신 : ${res.data.code}`);
          setResponseCertificationNumber(() => res.data.code);
        })
        .catch((err) => {
          console.log("이메일 인증 실패", err);
          setSendEmailConfirmation(() => false);
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
          setSendCheckNickname(() => false);
          console.log(err);
        });
    }
  }

  // 성별버튼
  function selectGender(gender: number): void {
    const newUserInfo: SignupUserInfo = { ...userInfo };
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
    const newUserInfo: SignupUserInfo = { ...userInfo };
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
    const newUserCertificationNumber: string = event.target.value;
    setUserCertificationNumber(() => newUserCertificationNumber);
    console.log(newUserCertificationNumber);
    if (newUserCertificationNumber.length === 8) {
      console.log(456);
      if (newUserCertificationNumber === responseCertificationNumber) {
        console.log(123);
        setEmailConfirmation(() => true);
        setEmailConfirmMessage("");
      } else {
        console.log(789);
        setEmailConfirmMessage("인증번호가 일치하지 않습니다.");
      }
    } else {
      setEmailConfirmMessage("");
      setEmailConfirmation(() => false);
    }
  }

  // 약관동의
  function checkAgreement(event: React.ChangeEvent<HTMLInputElement>): void {
    const newUserInfo: SignupUserInfo = { ...userInfo };
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
            inputProps={{ maxLength: 8 }}
            variant="outlined"
            margin="normal"
            fullWidth
            id="certificationNumber"
            label="인증번호"
            type="text"
            name="certificationNumber"
            onChange={changeUserCertificationNumber}
            helperText={emailConfirmMessage}
            error={!!emailConfirmMessage}
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
            onClick={requestSignup}
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