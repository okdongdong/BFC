import { Button } from "@mui/material";

function FullCourseHeader({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        justifyContent: "center",
        display: "flex",
        backgroundColor: "white",
        zIndex: 400,
      }}
    >
      <div
        style={{
          width: "85%",
          position: "relative",
        }}
      >
        <h1>Full Course</h1>
      </div>
      <Button
        sx={{ position: "absolute", right: 0 }}
        onClick={() => setOpenModal((val) => !val)}
      >
        나만의 장소 추가하기
      </Button>
    </div>
  );
}

export default FullCourseHeader;
