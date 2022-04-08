import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";
import { customAxios } from "../../../lib/customAxios";
import { connect } from "react-redux";
import { SetFullCourseData } from "../../../types/detail";
import { setFullCourseData } from "../../../redux/detail/action";
function FullCourseLike({
  fullCourseId,
  likeCnt,
  fullCourse,
  setFullCourseData,
}: Props) {
  const [checked, setChecked] = React.useState(false);

  const fetchData = async () => {
    const result = await customAxios({
      method: "get",
      url: `/fullCourse/${fullCourseId}/like`,
    });

    setChecked(result.data.isLiked);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  function onClick() {
    customAxios({
      method: "post",
      url: `/fullCourse/${fullCourseId}/like`,
    }).then((res) => {
      setChecked(res.data.isLiked);
      const newFullCourse = fullCourse;
      if (res.data.isLiked) {
        const newLikeCnt = likeCnt + 1;
        newFullCourse.likeCnt = newLikeCnt;
      } else {
        const newLikeCnt = likeCnt - 1;
        newFullCourse.likeCnt = newLikeCnt;
      }
      console.log("새로운 풀코스", newFullCourse);
      setFullCourseData(newFullCourse);

      fetchData();
    });
  }
  return (
    <div onClick={onClick} style={{ marginRight: "100%" }}>
      <IconButton>
        {checked === true ? (
          <FavoriteIcon sx={{ color: pink[500] }}></FavoriteIcon>
        ) : (
          <FavoriteBorderIcon sx={{ color: pink[500] }}></FavoriteBorderIcon>
        )}
      </IconButton>
    </div>
  );
}
const mapStateToProps = ({ fullCourse }: any) => {
  return {
    fullCourseId: fullCourse.fullCourseId,
    fullCourse: fullCourse,
    likeCnt: fullCourse.likeCnt,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setFullCourseData: (fullCourseData: SetFullCourseData) =>
      dispatch(setFullCourseData(fullCourseData)),
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FullCourseLike);
