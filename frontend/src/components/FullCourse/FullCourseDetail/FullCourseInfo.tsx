import { Button, FormGroup, Stack, Switch, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { customAxios } from "../../../lib/customAxios";
import { useNavigate } from "react-router";
import { createFullCourseSuccess } from "../../../redux/createFullCourse/actions";
import { setFullCourseData } from "../../../redux/detail/action";
import { SetFullCourseData } from "../../../types/detail";

function FullCourseInfo({
  title,
  isPublic,
  userId,
  currentUserId,
  fullCourseId,
  fullCourse,
  setFullCourseData,
  createFullCourseSuccess,
}: Props) {
  //내가 쓴글 확인
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  const navigate = useNavigate();
  function updatePublic() {
    customAxios({
      method: "put",
      url: `/fullCourse/${fullCourseId}/public`,
      data: { isPublic: !isPublic },
    })
      .then((res) => {})
      .catch((err) => {});
  }
  function updateFullCourse() {
    createFullCourseSuccess(fullCourseId);
    navigate("/fullCourse/create");
  }
  function deleteFullCourse() {
    customAxios({
      method: "delete",
      url: `/fullCourse/${fullCourseId}`,
    })
      .then(() => {
        navigate("/"); //삭제하고 메인페이지
      })
      .catch((err) => {});
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          marginLeft: "45%",
        }}
      >
        <Box sx={{ fontSize: "h4.fontSize" }}>{title}</Box>
      </div>
      {userId === currentUserId && (
        <>
          <FormGroup style={{ marginLeft: "250px", marginTop: "40px" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>비공개</Typography>
              {isPublic ? (
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                  onClick={updatePublic}
                />
              ) : (
                <AntSwitch
                  inputProps={{ "aria-label": "ant design" }}
                  onClick={updatePublic}
                />
              )}

              <Typography>공개</Typography>
            </Stack>
          </FormGroup>
          <Button
            variant="contained"
            onClick={updateFullCourse}
            style={{
              marginLeft: "20px",
              marginRight: "10px",
              width: "80px",
              height: "30px",
              padding: "0",
              fontSize: "h8.fontSize",
              marginTop: "40px",
            }}
          >
            수정하기
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={deleteFullCourse}
            style={{
              marginLeft: "10px",
              marginRight: "40px",
              width: "80px",
              height: "30px",
              padding: "0",
              fontSize: "h8.fontSize",
              marginTop: "40px",
            }}
          >
            삭제하기
          </Button>
        </>
      )}
    </div>
  );
}
const mapStateToProps = ({ fullCourse, account }: any) => {
  return {
    title: fullCourse.title,
    currentUserId: account.userId,
    isPublic: fullCourse.isPublic,
    userId: fullCourse.userId,
    fullCourseId: fullCourse.fullCourseId,
    fullCourse: fullCourse,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createFullCourseSuccess: (fullCourseId: number) =>
      dispatch(createFullCourseSuccess(fullCourseId)),
    setFullCourseData: (fullCourseData: SetFullCourseData) =>
      dispatch(setFullCourseData(fullCourseData)),
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FullCourseInfo);
