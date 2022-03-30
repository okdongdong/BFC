import { useEffect, useState } from "react";
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
import { AccountReducer } from "../../../redux/rootReducer";
import { connect } from "react-redux";
import { customAxios } from "../../../lib/customAxios";
import { SetUserInfo } from "../../../types/account";
import { getUserInfo, setUserInfo } from "../../../redux/account/actions";

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

function ChangeUserInfo({
  getUserInfo,
  setUserInfo,
  userId,
  username,
  nickname,
  birthday,
  gender,
}: Props) {
  const classes = useStyles();
  //회원정보가져오기
  getUserInfo(userId);

  const userInfo: SetUserInfo = {
    username: username,
    nickname: nickname,
    gender: gender,
    birthday: birthday,
  };
  //인증관련 state
  const [nicknameConfirmation, setNicknameConfirmation] =
    useState<boolean>(false);
  const [sendCheckNickname, setSendCheckNickname] = useState<boolean>(false);

  // 유효성 검사 처리
  const [nickNameMessage, setNickNameMessage] = useState<string>("");

  // 회원정보수정요청
  function requestChangeUser(): void {
    customAxios({
      method: "put",
      url: `/users/${userId}`,
      data: userInfo,
    })
      .then((res) => console.log(res)) // redux로 저장해서 사용해야할듯
      .catch((err) => console.log(err));
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
      setSendCheckNickname(() => true);
      customAxios({
        method: "get",
        url: `/auth/nickname`,
        params: { nickname: nickname },
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
    const newUserInfo: SetUserInfo = { ...userInfo };
    if (gender === 1) {
      newUserInfo.gender = 1;
      setUserInfo(newUserInfo);
    } else {
      newUserInfo.gender = 0;
      setUserInfo(newUserInfo);
    }
  }

  // 회원정보수정폼 정보입력
  function changeUserInfo(event: React.ChangeEvent<HTMLInputElement>): void {
    const newUserInfo: SetUserInfo = { ...userInfo };
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
            defaultValue={username}
            type="text"
            name="certificationNumber"
          />

          <TextFieldWithButton
            label="닉네임"
            id="nickname"
            onChange={changeUserInfo}
            onClickButton={requestCheckNickname}
            buttonText="닉네임중복확인"
            value={nickname}
            disabled={sendCheckNickname}
            helperText={nickNameMessage}
          ></TextFieldWithButton>
          <ButtonGroup
            color="primary"
            aria-label="primary button group"
            className={classes.form}
          >
            <Button
              variant={gender === 1 ? "contained" : "outlined"}
              onClick={() => selectGender(1)}
            >
              남
            </Button>
            <Button
              variant={gender === 0 ? "contained" : "outlined"}
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
            defaultValue={birthday}
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
const mapStateToProps = ({ account }: AccountReducer) => {
  return {
    isLogin: account.isLogin,
    userId: account.userId,
    nickname: account.nickname,
    username: account.username,
    gender: account.gender,
    birthday: account.birthday,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserInfo: (userId: number) => dispatch(getUserInfo(userId)),
    setUserInfo: (userInfo: SetUserInfo) => dispatch(setUserInfo(userInfo)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserInfo);
