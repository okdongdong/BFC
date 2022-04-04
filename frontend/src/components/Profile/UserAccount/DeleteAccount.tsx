import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import { Alert } from "@mui/material";
import { AccountReducer } from "../../../redux/rootReducer";
import { connect } from "react-redux";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DeleteAccount({ userId, username }: Props) {
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem("accessToken") || "";
  function changePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }
  function requestDeleteAccount(): void {
    const userInfo = {
      username: username,
      password: password,
    };
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/${userId}`,
      data: userInfo,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        alert("탈퇴되었습니다");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <Button onClick={handleOpen} fullWidth variant="contained" color="error">
        탈퇴하기
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            회원 탈퇴하시겠습니까?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              onChange={changePassword}
              autoComplete="current-password"
            />
          </Typography>
          <div style={{ display: "flex", alignItems: "stretch" }}>
            <Button
              onClick={requestDeleteAccount}
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginRight: "20px" }}
            >
              확인
            </Button>
            <Button
              onClick={handleClose}
              fullWidth
              variant="contained"
              color="primary"
            >
              취소
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
const mapStateToProps = ({ account }: AccountReducer) => {
  return {
    userId: account.userId,
    username: account.username,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(DeleteAccount);
