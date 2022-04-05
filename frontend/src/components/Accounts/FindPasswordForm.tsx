import React, { useState } from "react";

import { makeStyles } from "@mui/styles";

import axios from "axios";
import TextFieldWithButton from "./TextFieldWithButton";
import { Button, Container, TextField, Theme, Typography } from "@mui/material";
import { connect } from "react-redux";
import { AccountReducer } from "../../redux/rootReducer";

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

function FindPasswordForm({ userId }: Props) {
  const classes = useStyles();
  // 이메일
  const [email, setEmail] = useState<string>("");

  // 인증관련 state
  const [emailConfirmation, setEmailConfirmation] = useState<boolean>(false);
  const [sendEmailConfirmation, setSendEmailConfirmation] =
    useState<boolean>(false);
  const [userCertificationNumber, setUserCertificationNumber] =
    useState<number>(0);
  const [responseCertificationNumber, setResponseCertificationNumber] =
    useState<number>(0);

  // 유효성 검사 처리
  const [emailMessage, setEmailMessage] = useState<string>("");

  // 임시비밀번호 발급받기
  function requestTempPw(): void {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/verification/reset`,
      data: { email: email },
    })
      .then((res) => {
        console.log(res);
        alert("임시비밀번호가 발급되었습니다.");
      })
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
      console.log(email);
      setSendEmailConfirmation(() => true);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/verification`,
        data: { email: email },
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

  // 이메일 입력
  function changeEmail(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
    // 유효성 검사
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!email || emailRegex.test(email)) {
      setEmailMessage("");
    } else {
      setEmailMessage("이메일 형식이 틀렸습니다.");
    }

    return;
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

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          비밀번호 재설정
        </Typography>
        <form className={classes.form} noValidate>
          <TextFieldWithButton
            label="이메일"
            id="username"
            autoComplete="email"
            onChange={changeEmail}
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={requestTempPw}
            // disabled={email === "" || emailConfirmation === false}
          >
            임시비밀번호 발급받기
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = ({ account }: AccountReducer) => {
  return {
    userId: account.userId,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(FindPasswordForm);
