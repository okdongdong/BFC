import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import { Alert } from "@mui/material";
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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user_id = 1; //리덕스로 받은 데이터
  function requestDeleteAccount(): void {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/${user_id}`,
    })
      .then(() => {
        <Alert severity="success">탈퇴되었습니다.</Alert>;
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
