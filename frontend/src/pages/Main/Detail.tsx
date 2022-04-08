import RestaurantDetail from "../../components/Detail/RestaurantDetail";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/customAxios";
import { connect } from "react-redux";
import { SetPlaceData } from "../../types/detail";
import { setPlaceData } from "../../redux/detail/action";
import { Backdrop, CircularProgress } from "@mui/material";
function Detail({ setPlaceData }: Props) {
  const params = useParams();
  const placeId = params["placeId"];
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    const result = await customAxios({
      method: "get",
      url: `/place/${placeId}`,
    });
    setPlaceData(result.data);
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
        <div>
          <RestaurantDetail></RestaurantDetail>
          {/* <AttractionDetail></AttractionDetail> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
const mapStateToProps = ({ place }: any) => {
  return { category: place.category };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setPlaceData: (placeData: SetPlaceData) =>
      dispatch(setPlaceData(placeData)),
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
