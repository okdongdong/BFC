import { Card, CardContent, CardMedia, Modal, Typography } from "@mui/material";
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
  // borderRadius: "20px",
  // border: "2px solid #000",
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
  name: string;
  average_score: number;
  thumbnail: string;
}
interface ModalProps {
  open: boolean;
  title: string;
  contentList: content[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function PlaceModal({ open, setOpen, contentList, title }: ModalProps) {
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
              <Card
                key={idx}
                sx={{
                  width: "200px",
                  height: "200px",
                  margin: "10px",
                  borderRadius: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={item.thumbnail}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontSize: "15px" }}
                  >
                    {item.name}
                    {item.average_score}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default PlaceModal;
