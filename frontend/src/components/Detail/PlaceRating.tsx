import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { customAxios } from "../../lib/customAxios";
import { connect } from "react-redux";
import Detail from "../../pages/Main/Detail";
import { Button } from "@mui/material";
import { setPlaceData } from "../../redux/detail/action";
import { SetPlaceData } from "../../types/detail";
const labels: { [index: string]: string } = {
  0.5: "0.5",
  1: "1.0",
  1.5: "1.5",
  2: "2.0",
  2.5: "2.5",
  3: "3.0",
  3.5: "3.5",
  4: "4.0",
  4.5: "4.5",
  5: "5.0",
};

function PlaceRating({
  placeId,
  place,
  setPlaceData,
  averageScore,
  scoreCount,
}: Props) {
  const [value, setValue] = React.useState<number | null>(0); //별점 default값
  const [hover, setHover] = React.useState(-1);
  const [method, setMethod] = React.useState("post");
  const [btnName, setBtnName] = React.useState("등록");
  const [isClick, setIsClick] = React.useState(false);
  // 내평점가져오기
  const fetchData = async () => {
    const result = await customAxios({
      method: "get",
      url: `/place/${placeId}/score`,
    });
    setValue(result.data.score);
    console.log("데이터 가져옴", result.data.score);
    if (result.data.score) {
      setMethod("put");
      setBtnName("변경");
    }
  };
  React.useEffect(() => {
    fetchData();
    console.log("확인!!!!!!!!!!!!!!!!!!!!!!");
  }, [isClick]);

  function deleteScore() {
    customAxios({
      method: "delete",
      url: `/place/${placeId}/score`,
    }).then((res) => {
      if (value) {
        const newPlace = place;
        const newAverageScore =
          (averageScore * scoreCount - value) / (scoreCount - 1);
        newPlace.averageScore = newAverageScore;
        console.log("ddddddddddddd", place, newPlace);
        setPlaceData(newPlace);
      }
      setValue(0);
      setMethod("post");
      setBtnName("등록");
      console.log(res);
    });
  }
  function onChange() {
    if (method === "post") {
      customAxios({
        method: "post",
        url: `/place/${placeId}/score`,
        data: { score: value },
      }).then((res) => {
        if (value) {
          const newPlace = place;
          const newAverageScore =
            (value + averageScore * scoreCount) / (scoreCount + 1);
          newPlace.averageScore = newAverageScore;
          console.log("ddddddddddddd", place, newPlace);
          setPlaceData(newPlace);
        }
        setMethod("put");
        setBtnName("변경");
        setIsClick(true);
        console.log(res);
      });
    } else if (method === "put") {
      customAxios({
        method: "put",
        url: `/place/${placeId}/score`,
        data: { score: value },
      }).then((res) => {
        console.log(res);
        if (value) {
          const newPlace = place;
          const newAverageScore =
            (value + averageScore * scoreCount) / (scoreCount + 1);
          newPlace.averageScore = newAverageScore;
          console.log("ddddddddddddd", place, newPlace);
          setPlaceData(newPlace);
        }
      });
    }
  }
  return (
    <div style={{ display: "flex" }}>
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />

        <div>
          {value !== null && (
            <Box sx={{ ml: 1, mr: 1 }}>
              {labels[hover !== -1 ? hover : value]}
            </Box>
          )}
        </div>
      </Box>
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          onClick={onChange}
          style={{ width: "60px", marginRight: "10px" }}
        >
          {btnName}
        </Button>
        {method === "put" ? (
          <Button
            variant="outlined"
            color="error"
            onClick={deleteScore}
            style={{ width: "60px" }}
          >
            삭제
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = ({ place }: any) => {
  return {
    placeId: place.placeId,
    place: place,
    averageScore: place.averageScore,
    scoreCount: place.scoreCount,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setPlaceData: (place: SetPlaceData) => {
      setPlaceData(place);
    },
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(PlaceRating);
