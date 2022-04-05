import { Button, Modal, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";

//모달 스타일
const useStyles = makeStyles((theme: Theme) => ({
  myImg: {
    borderRadius: theme.spacing(100),
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft: "8px",
    marginRight: "8px",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",

  height: "600px",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",

  /* 스크롤바 설정*/
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  /* 스크롤바 막대 설정*/
  "&::-webkit-scrollbar-thumb": {
    height: "17%",
    backgroundColor: "rgba(33,133,133,1)",
    borderRadius: " 10px",
  },
  /* 스크롤바 뒷 배경 설정*/
  "&::-webkit-scrollbar-track": {
    backgroundColor: " rgba(33,133,133,0.33)",
  },
};
interface person {
  nickname: string;
  profileImg: string;
  isFollowing: boolean;
}
interface ModalProps {
  open: boolean;
  contentList: person[];
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function FollowModal({ open, setOpen, contentList, title }: ModalProps) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div>
            {contentList.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  marginTop: "8px",
                  alignItems: "center",
                }}
              >
                <img
                  className={classes.myImg}
                  src={item.profileImg}
                  alt="fullCourseImg"
                ></img>

                <p>{item.nickname}</p>

                {item.isFollowing ? (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      item.isFollowing = !item.isFollowing;
                    }}
                    style={{
                      height: "30px",
                      marginLeft: "40px",
                      marginRight: "8px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    }}
                  >
                    언팔로우
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      item.isFollowing = !item.isFollowing;
                    }}
                    style={{
                      height: "30px",
                      marginLeft: "40px",
                      marginRight: "8px",
                      paddingRight: "22px",
                      paddingLeft: "22px",
                    }}
                  >
                    팔로우
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default FollowModal;
