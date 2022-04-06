import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";
import { customAxios } from "../../../lib/customAxios";
import { connect } from "react-redux";
function FullCourseLike({ fullCourseId }: Props) {
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
      console.log(res.data);
      setChecked(res.data.isLiked);
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
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(FullCourseLike);
