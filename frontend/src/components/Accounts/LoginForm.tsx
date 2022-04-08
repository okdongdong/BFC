import React, { useState, useEffect, KeyboardEvent } from "react";

import kakaoLogo from "../../assets/img/kakaoLogo.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Typography,
  Link,
  Container,
  TextField,
  Grid,
  Button,
  Box,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { userLogin } from "../../redux/account/actions";
import { LoginUserInfo } from "../../types/account";
import { AccountReducer } from "../../redux/rootReducer";

//footbar
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="/">
        Busan Full Course
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//스타일
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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

//로그인
function LoginForm({ userLogin, isLogin }: Props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onKeyPress = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      login(); //enter누르면 작성
    }
  };
  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const login = () => {
    const data: LoginUserInfo = {
      username: email,
      password: password,
    };

    userLogin(data);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

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
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <div className={classes.form}>
            <TextField
              value={email}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onEmailHandler}
            />
            <TextField
              value={password}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onPasswordHandler}
              onKeyPress={onKeyPress}
            />
            <Grid container>
              <Grid item xs>
                <RouterLink to="/signup">회원가입</RouterLink>
              </Grid>
              <Grid item xs>
                |
              </Grid>
              <Grid item xs>
                <RouterLink to="/findPw">비밀번호찾기</RouterLink>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              로그인
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={(classes.submit, classes.btn)}
              onClick={login}
            >
              <img
                src={kakaoLogo}
                alt="kakao-logo"
                width="20px"
                height="20px"
                className={classes.logo}
              />
              카카오로그인
            </Button>
          </div>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

const mapStateToProps = ({ account }: AccountReducer) => {
  return {
    isLogin: account.isLogin,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    userLogin: (userInfo: LoginUserInfo) => dispatch(userLogin(userInfo)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
