import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { resetFullCourse } from "../../../redux/createFullCourse/actions";
import { connect } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

interface ExitCreateModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExitCreateModal = ({
  openModal,
  setOpenModal,
  resetFullCourse,
}: ExitCreateModalProps & Props) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenModal(false);
  };

  const exitHandler = () => {
    resetFullCourse();
    navigate("/");
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              작성된 내용은 자동저장됩니다.
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              정말 나갈까요?
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 32,
              }}
            >
              <Button onClick={() => exitHandler()} color="error">
                나가기
              </Button>
              <Button onClick={() => handleClose()}>계속작성하기</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetFullCourse: () => dispatch(resetFullCourse()),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ExitCreateModal);
