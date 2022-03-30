import { useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { AccountReducer } from "../../../redux/rootReducer";
import { customAxios } from "../../../lib/customAxios";

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
  newPassword: string;
  passwordCheck: string;
  oldPassword: string;
  [key: string]: any; // 이거를 쓰면 ts를 쓰는 의미가 없긴한데 일단 오류를 해결하기 위해 사용
}

function ChangePassword({ username, userId }: Props) {
  const classes = useStyles();
  // 유저정보 기본값
  const initUserInfo: UserInfo = {
    username: username,
    oldPassword: "",
    newPassword: "",
    passwordCheck: "",
  };

  // 유저정보 state
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);

  // 유효성 검사 처리
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");

  // 비밀번호 수정 요청전송
  function requestSetpassword(userInfo: UserInfo): void {
    console.log("눌림");
    // const token = localStorage.getItem("accessToken") || "";
    // axios({
    //   method: "post",
    //   url: `/users/${userId}/password`,
    //   data: userInfo,
    //   headers: {
    //     Authorization: token,
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     console.log("바뀜바뀜");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  // 비밀번호수정 정보입력
  function changeUserInfo(event: React.ChangeEvent<HTMLInputElement>): void {
    const newUserInfo: UserInfo = { ...userInfo };
    const targetId: string = event.target.id;
    newUserInfo[targetId] = event.target.value;
    setUserInfo(() => newUserInfo);
    // 유효성 검사
    switch (targetId) {
      case "newPassword":
        // 비밀번호 유효성 검사
        const passwordRegex =
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (
          !newUserInfo.newPassword ||
          passwordRegex.test(newUserInfo.newPassword)
        ) {
          setPasswordMessage("");
        } else {
          setPasswordMessage(
            "숫자+영문자+특수문자 조합으로 8자리이상 입력하세요."
          );
        }
        // 비밀번호 확인 일치검사
        if (
          !newUserInfo.passwordCheck ||
          newUserInfo.newPassword === newUserInfo.passwordCheck
        ) {
          setPasswordConfirmMessage("");
        } else {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        }

        break;
      case "passwordCheck":
        if (
          !newUserInfo.passwordCheck ||
          newUserInfo.newPassword === newUserInfo.passwordCheck
        ) {
          setPasswordConfirmMessage("");
        } else {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        }
        break;
      default:
        return;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="oldPassword"
            label="기존비밀번호"
            type="password"
            id="oldPassword"
            autoComplete="current-password"
            onChange={changeUserInfo}
          />
          <TextField
            error={!!passwordMessage}
            helperText={passwordMessage}
            variant="outlined"
            margin="normal"
            fullWidth
            name="newPassword"
            label="비밀번호"
            type="password"
            id="newPassword"
            autoComplete="current-password"
            onChange={changeUserInfo}
          />
          <TextField
            error={!!passwordConfirmMessage}
            helperText={passwordConfirmMessage}
            variant="outlined"
            margin="normal"
            fullWidth
            name="passwordCheck"
            label="비밀번호 확인"
            type="password"
            id="passwordCheck"
            onChange={changeUserInfo}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => requestSetpassword}
            disabled={
              userInfo.newPassword !== userInfo.passwordCheck ||
              userInfo.oldPassword === ""
            }
          >
            정보수정
          </Button>
        </form>
      </div>
    </Container>
  );
}
const mapStateToProps = ({ account }: AccountReducer) => {
  return {
    userId: account.userId,
    username: account.username,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ChangePassword);
