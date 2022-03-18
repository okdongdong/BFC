import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import kakaoLogo from "../../assets/img/kakaoLogo.png";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

//footbar
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://mui.com/">
        Busan Full Course
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//스타일
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
export default function LoginForm() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    console.log(event.currentTarget.value);
  };
  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const login = () => {
    // event.preventDefault();

    let body = {
      username: email,
      password: password,
    };
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
      data: body,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} noValidate>
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
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
