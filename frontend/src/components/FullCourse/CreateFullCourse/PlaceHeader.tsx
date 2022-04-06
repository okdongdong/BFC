import {
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { getSearchPlaceList } from "../../../redux/placeList/actions";
import { PlaceSearchInfo } from "../../../redux/placeList/types";

interface PlaceHeaderProps {
  nowPage: number;
  nowFilterTypeIdx: number;
  recommendDistance: number;
  setNowPage: React.Dispatch<React.SetStateAction<number>>;
  setNowFilterTypeIdx: React.Dispatch<React.SetStateAction<number>>;
  setRecommendDistance: React.Dispatch<React.SetStateAction<number>>;

  SIZE: number;
}
const SearchInput = styled(TextField)({
  "& label.Mui-focused": {
    color: "rgba(0,0,0,0)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(0,0,0,0)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0,0,0,0)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0,0,0,0)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0,0,0,0)",
    },
  },
});

function PlaceHeader({
  getSearchPlaceList,
  nowFilterTypeIdx,
  nowPage,
  recommendDistance,
  setNowFilterTypeIdx,
  setRecommendDistance,
  SIZE,
}: Props & PlaceHeaderProps) {
  const filterType = ["평점순", "거리순", "사전설문순"];
  const [placeName, setPlaceName] = useState<string>("");

  const FilterTextStyle = styled("div")((attr: { idx: number }) => ({
    backgroundColor: `${attr.idx === nowFilterTypeIdx ? "#57A3EC" : "white"}`,
    color: `${attr.idx !== nowFilterTypeIdx || "white"}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    height: 50,
    width: "100%",
    position: "relative",
    fontSize: 20,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#9ACBF2",
      color: "white",
    },
  }));
  const DistanceTextStyle = styled("div")((attr: { val: number }) => ({
    backgroundColor: `${attr.val === recommendDistance ? "#57A3EC" : "white"}`,
    color: `${attr.val !== recommendDistance || "white"}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    height: 30,
    width: "100%",
    position: "relative",
    fontSize: 12,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#9ACBF2",
      color: "white",
    },
  }));

  const FilterTextBox = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
    fontSize: 20,
    fontWeight: "bold",
  }));

  const selectFilterHandler = (idx: number) => {
    setNowFilterTypeIdx(idx);
  };

  const onKeyUpHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      getSearchPlaceList({
        name: placeName,
      });
    }
  };

  const onSearchHandler = () => {
    getSearchPlaceList({
      name: placeName,
    });
  };

  const onSearchChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlaceName(event.target.value);
  };

  return (
    <div
      style={{
        paddingTop: 32,
        width: "100%",
        justifyContent: "center",
        display: "flex",
        position: "sticky",
        top: 0,
        zIndex: 500,
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "85%",
        }}
      >
        <SearchInput
          placeholder="검색어를 입력하세요"
          fullWidth
          type="text"
          sx={{
            zIndex: 400,
            backgroundColor: "white",
            borderRadius: 25,
            marginBottom: 2,
          }}
          onChange={onSearchChangeHandler}
          onKeyUp={(event) => onKeyUpHandler(event)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onSearchHandler}>
                  <Icon>search</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1}>
          {filterType.map((filter, idx) => (
            <FilterTextBox key={idx} onClick={() => selectFilterHandler(idx)}>
              <FilterTextStyle
                idx={idx}
                key={idx}
                onClick={() => selectFilterHandler(idx)}
              >
                <p style={{ margin: 0 }}>{filter}</p>
              </FilterTextStyle>
            </FilterTextBox>
          ))}
        </Stack>

        {nowFilterTypeIdx !== 1 || (
          <Stack direction="row" spacing={1} sx={{ height: 50, marginTop: 1 }}>
            {[500, 1000, 2000, 3000, 4000].map((val, idx) => (
              <DistanceTextStyle
                key={idx}
                val={val}
                onClick={() => setRecommendDistance(val)}
              >
                <div style={{ zIndex: 400 }}>
                  {val < 1000 ? (
                    <span>{val}m</span>
                  ) : (
                    <span>{Math.floor(val / 1000)}km</span>
                  )}
                </div>
              </DistanceTextStyle>
            ))}
          </Stack>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ createFullCourse }: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchPlaceList: (placeSearchInfo: PlaceSearchInfo) =>
      dispatch(getSearchPlaceList(placeSearchInfo)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(PlaceHeader);
