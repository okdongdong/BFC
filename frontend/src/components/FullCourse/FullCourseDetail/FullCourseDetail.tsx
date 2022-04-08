import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { customAxios } from "../../../lib/customAxios";
import { setFullCourseData } from "../../../redux/detail/action";
import { SetFullCourseData } from "../../../types/detail";
import FullCourseDetailKakaoMap from "./FullCourseDetailKakaoMap";
import FullCourseHeader from "./FullCourseHeader";
import FullCourseMain from "./FullCourseMain";

function FullCourseDetail({ setFullCourseData }: Props) {
  const params = useParams();
  const fullCourseId = params["fullCourseId"];
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    const result = await customAxios({
      method: "get",
      url: `/fullCourse/${fullCourseId}`,
    });
    setFullCourseData(result.data);
    setIsLoading(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isLoading ? (
        <>
          <FullCourseHeader></FullCourseHeader>
          <FullCourseMain></FullCourseMain>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
const mapStateToProps = ({ place }: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setFullCourseData: (fullCourseData: SetFullCourseData) =>
      dispatch(setFullCourseData(fullCourseData)),
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FullCourseDetail);
