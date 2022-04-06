import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import { resetFullCourse } from "../../../redux/createFullCourse/actions";
import { useNavigate } from "react-router";

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

interface PreSurveyModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const PreSurveyModal = ({
  openModal,
  setOpenModal,
  resetFullCourse,
}: PreSurveyModalProps & Props) => {
  const handleClose = () => {
    resetFullCourse();
    setOpenModal(false);
  };
  const navigate = useNavigate();

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
              이전에 작성중인 풀코스가 있습니다.
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              작성중인 풀코스를 불러올까요?
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 32,
              }}
            >
              <Button onClick={handleClose} color="error">
                새로 작성하기
              </Button>
              <Button onClick={() => navigate("/fullcourse/create")}>
                불러오기
              </Button>
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
    resetFullCourse: () => {
      dispatch(resetFullCourse);
    },
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(PreSurveyModal);
