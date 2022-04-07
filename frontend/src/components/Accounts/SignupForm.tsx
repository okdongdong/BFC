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
import { customAxios, customAxiosDjango } from "../../lib/customAxios";
import { errorControl, loadingControl } from "../../redux/baseInfo/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: theme.spacing(3),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    borderRadius: 15,
    zIndex: 1,
    position: "relative",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignupForm({ errorControl, loadingControl }: Props) {
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
  const requestSignup = async () => {
    loadingControl(true);

    try {
      const res = await customAxios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/signup`,
        data: {
          username: userInfo.username,
          password: userInfo.password,
          passwordCheck: userInfo.passwordConfirmation,
          nickname: userInfo.nickname,
          birthday: userInfo.birthday,
          gender: userInfo.gender,
        },
      });

      console.log(res);
      if (res.status !== 200) {
        throw new Error("SinupFailed");
      }

      const userId = res.data.userId;

      navigate("/login");
      const res2 = await customAxiosDjango({
        method: "get",
        url: `recommend/new_user/${userId}`,
      });
      console.log(res2)

    } catch (e: any) {
      console.log(e);
      console.log(e.data);
      if (e.message === "SinupFailed") {
        errorControl("회원가입에 실패했습니다.");
      } else {
        errorControl("알수없는 에러가 발생했습니다.");
      }
    }

    loadingControl(false);
  };

  // 이메일 인증요청
  function requsetEmailConfirmation(): void {
    // 버튼을 다시누르는 경우 다시인증해야함
    if (sendEmailConfirmation) {
      setSendEmailConfirmation(() => false);
      setEmailConfirmation(() => false);
    } else {
      // 인증
      console.log("이메일 인증요청");
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
      setSendCheckNickname(() => true);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/nickname`,
        params: { nickname: userInfo.nickname },
      })
        .then((res) => {
          setNicknameConfirmation(() => true);
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
  }

  // 이메일 인증번호 입력
  function changeUserCertificationNumber(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const userCertificationNumber: string = event.target.value;
    if (userCertificationNumber.length === 8) {
      if (userCertificationNumber === responseCertificationNumber) {
        setEmailConfirmation(() => true);
        setEmailConfirmMessage("");
      } else {
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
  }

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        alignItems: "center",
        height: "calc(100% - 80px)",
        width: "100%",
      }}
    >
      <Container component="main" maxWidth="sm">
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
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    errorControl: (errorMessage: string) => {
      errorControl(dispatch, errorMessage);
    },
    loadingControl: (state: boolean) => {
      loadingControl(dispatch, state);
    },
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
