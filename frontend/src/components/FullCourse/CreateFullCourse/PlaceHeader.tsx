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
  setNowPage: React.Dispatch<React.SetStateAction<number>>;
  SIZE: number;
}

function PlaceHeader({
  getSearchPlaceList,
  nowPage,
  setNowPage,
  SIZE,
}: Props & PlaceHeaderProps) {
  const filterType = ["평점순", "거리순", "사전설문순"];
  const [placeName, setPlaceName] = useState<string>("");
  const [nowFilterTypeIdx, setNowFilterTypeIdx] = useState<number>(0);

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
        placeName: placeName,
        page: nowPage,
        size: SIZE,
      });
    }
  };

  const onSearchHandler = () => {
    getSearchPlaceList({
      placeName: placeName,
      page: nowPage,
      size: SIZE,
    });
  };

  const onSearchChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event);
    setPlaceName(event.target.value);
  };

  return (
    <div
      style={{
        marginTop: 32,
        width: "100%",
        justifyContent: "center",
        display: "flex",
        position: "sticky",
        top: 0,
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
