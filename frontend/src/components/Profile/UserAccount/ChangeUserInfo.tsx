import { useState, useEffect } from "react";
import TextFieldWithButton from "../../Accounts/TextFieldWithButton";
import {
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  TextField,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteAccount from "./DeleteAccount";
import { AccountReducer } from "../../../redux/rootReducer";
import { connect } from "react-redux";
import axios from "axios";

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
  userId: number;
  username: string;
  nickname: string;
  gender: boolean;
  birthday: string;
  profileImg: string;
  [key: string]: any;
}

function ChangeUserInfo({ userId }: Props) {
  const initUserInfo: UserInfo = {
    userId: userId,
    username: "",
    nickname: "",
    birthday: "",
    gender: false,
    profileImg: "",
  };
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);
  const [isLoading, setIsLoading] = useState(false);
  //회원정보가져오기
  const token = localStorage.getItem("accessToken") || "";
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/${userId}`,
        headers: {
          Authorization: token,
        },
      });
      setUserInfo(result.data);
      setIsLoading(true);
    };
    fetchData();
  }, []);

  //인증관련 state
  const [nicknameConfirmation, setNicknameConfirmation] =
    useState<boolean>(false);
  const [sendCheckNickname, setSendCheckNickname] = useState<boolean>(false);

  // 유효성 검사 처리
  const [nickNameMessage, setNickNameMessage] = useState<string>("");

  // 회원정보수정요청
  function requestChangeUser() {
    const userData = {
      username: userInfo.username,
      nickname: userInfo.nickname,
      birthday: userInfo.birthday,
      gender: userInfo.gender,
    };
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/${userId}`,
      data: userData,
      headers: {
        Authorization: token,
      },
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
      setSendCheckNickname(() => true);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/nickname`,
        params: { nickname: userInfo.nickname },
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          setNicknameConfirmation(() => true);
        })
        .catch((err) => {
          // setSendCheckNickname(() => false);
        });
    }
  }

  // 성별버튼
  function selectGender(gender: boolean): void {
    const newUserInfo: UserInfo = { ...userInfo };
    if (gender === true) {
      newUserInfo.gender = true;
      setUserInfo(newUserInfo);
    } else {
      newUserInfo.gender = false;
      setUserInfo(newUserInfo);
    }
  }

  // 회원정보수정폼 정보입력
  function changeUserInfo(event: React.ChangeEvent<HTMLInputElement>): void {
    const newUserInfo: UserInfo = { ...userInfo };
    const targetId: string = event.target.id;
    newUserInfo[targetId] = event.target.value;
    setUserInfo(newUserInfo);

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
  }

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isLoading ? (
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            {/* {userId} */}
            <TextField
              disabled
              variant="filled"
              margin="normal"
              fullWidth
              id="certificationNumber"
              label="이메일"
              defaultValue={userInfo.username}
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
                variant={userInfo.gender === true ? "contained" : "outlined"}
                onClick={() => selectGender(true)}
              >
                남
              </Button>
              <Button
                variant={userInfo.gender === false ? "contained" : "outlined"}
                onClick={() => selectGender(false)}
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
              onClick={requestChangeUser}
              disabled={nicknameConfirmation === false}
            >
              정보수정
            </Button>
            <DeleteAccount></DeleteAccount>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
}

const mapStateToProps = ({ account }: AccountReducer) => {
  return {
    userId: account.userId,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ChangeUserInfo);
