import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

//모달 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "1000px",
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
interface content {
  label: string;
  thumbnail: string;
}
interface ModalProps {
  open: boolean;
  contentList: content[];
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function FullCourseModal({ open, setOpen, contentList, title }: ModalProps) {
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              position: "fixed",
              top: "0",
              left: "0",
              width: "91.5%",
              height: "80%",
              zIndex: "1000",
              marginTop: "100px",
              marginLeft: "90px",
            }}
          >
            {contentList.map((item, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                }}
              >
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    margin: "10px",
                    // marginRight: "10px",
                    // marginLeft: "10px",
                    borderRadius: "10px",
                  }}
                  src={item.thumbnail}
                  alt="fullCourseImg"
                ></img>
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    marginRight: "10px",
                    marginLeft: "10px",
                    borderRadius: "10px",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: 0,
                    left: 0,
                  }}
                >
                  <p style={{ color: "white" }}>#{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default FullCourseModal;
