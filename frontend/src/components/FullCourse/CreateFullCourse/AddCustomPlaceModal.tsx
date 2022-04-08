import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { toStringByFormatting } from "../../../layouts/CreateFullCourseNavbar";
import { ModalScrollableBox } from "../../../lib/customTag";
import { createCustomPlace } from "../../../redux/createFullCourse/actions";
import { CustomPlaceInfoProps } from "../../../redux/createFullCourse/types";
import ModalKakaoMap from "./ModalKakaoMap";

interface AddCustomPlaceModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapContainer = styled("div")({
  width: "100%",
  height: 300,
  display: "flex",
  backgroundColor: "#cdcdcd",
});

const SelectItem = styled("div")({
  height: "100%",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#FFEFB5",
  },
});

const { kakao } = window;

function AddCustomPlaceModal({
  openModal,
  setOpenModal,
  fullCourseList,
  fullCourseId,
  fullCourseDate,
  createCustomPlace,
}: Props & AddCustomPlaceModalProps) {
  const [customPlaceName, setCustomPlaceName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [day, setDay] = useState<number>(1);
  const [memo, setMemo] = useState<string>("");
  const [nowSearch, setNowSearch] = useState<boolean>(false);
  const [nowMove, setNowMove] = useState<boolean>(false);
  const [location, setLocation] = useState({
    lat: 35.1797913,
    lng: 129.074987,
  });
  const [selectedCustomPlaceId, setSelectedCustomPlaceId] = useState(0);

  const [customSearchList, setCustomSearchList] = useState([]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const placeNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomPlaceName(event.target.value);
  };
  const placeAddressChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(event.target.value);
  };
  const dayChangeHandler = (event: SelectChangeEvent) => {
    setDay(parseInt(event.target.value));
  };
  const memoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  const onclickHandler = () => {
    const customPlaceInfo: CustomPlaceInfoProps = {
      name: customPlaceName,
      memo: memo,
      address: address,
      lat: location.lat,
      lon: location.lng,
      day: day,
      sequence: fullCourseList[day - 1].length + 1,
      fullCourseId: fullCourseId,
    };

    createCustomPlace(customPlaceInfo);
    setOpenModal(false);
  };

  const onKeyUpHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setNowSearch(true);
    }
  };

  const selectSearchPlaceHandler = (customSearch: any) => {
    setSelectedCustomPlaceId(customSearch.id);
    setLocation({
      lat: customSearch.y,
      lng: customSearch.x,
    });
    if (customPlaceName === "") {
      setCustomPlaceName(customSearch.place_name);
    }

    setNowMove(true);
  };

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack spacing={2} direction="row" sx={{ maxHeight: 800 }}>
        <ModalScrollableBox
          style={{
            height: 800,
            width: 500,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "#fff",
            borderRadius: 5,
          }}
        >
          <h1 style={{ textAlign: "center" }}>나만의 장소 추가</h1>
          <hr />
          <Stack
            spacing={2}
            sx={{
              width: "400px",
              margin: "auto",
            }}
          >
            <TextField
              label="나만의 장소명"
              fullWidth
              onChange={placeNameChangeHandler}
              value={customPlaceName}
            ></TextField>
            <TextField
              label="장소검색"
              fullWidth
              onChange={placeAddressChangeHandler}
              onKeyUp={(event) => onKeyUpHandler(event)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setNowSearch(true)}>
                      <Icon>search</Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>

            <MapContainer>
              <ModalKakaoMap
                lat={location.lat}
                lng={location.lng}
                setCustomSearchList={setCustomSearchList}
                address={address}
                nowSearch={nowSearch}
                nowMove={nowMove}
                setNowSearch={setNowSearch}
                setNowMove={setNowMove}
                setLocation={setLocation}
                mapId={"modal-map"}
              ></ModalKakaoMap>
            </MapContainer>
            <FormControl fullWidth>
              <InputLabel id="select-day-label">추가할 날짜</InputLabel>
              <Select
                labelId="select-day-label"
                label="추가할 날짜"
                value={`${day}`}
                onChange={dayChangeHandler}
              >
                {fullCourseList.map((fullCourse: any, idx: number) => (
                  <MenuItem value={idx + 1}>{`Day${
                    idx + 1
                  } (${toStringByFormatting(
                    new Date(
                      new Date(fullCourseDate[0]).setDate(
                        new Date(fullCourseDate[0]).getDate() + idx
                      )
                    )
                  )})`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="메모"
              fullWidth
              minRows={3}
              multiline
              onChange={memoChangeHandler}
            ></TextField>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            sx={{
              marginTop: 1,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ccc",
                color: "g",
                "&:hover": {
                  backgroundColor: "#FF5A5A",
                  borderColor: "#0062cc",
                },
              }}
              onClick={handleClose}
            >
              취소
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#47A3EC",
              }}
              onClick={onclickHandler}
            >
              작성완료
            </Button>
          </Stack>
        </ModalScrollableBox>
        <ModalScrollableBox
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            width: 300,
            height: 800,
            backgroundColor: "#fff",
            borderRadius: 5,
            zIndex: 1200,
          }}
        >
          <h1 style={{ textAlign: "center" }}>장소검색결과</h1>
          <hr />
          <Stack
            spacing={2}
            sx={{
              margin: "auto",
            }}
          >
            {customSearchList.length === 0 ||
              customSearchList.map((customSearch: any, idx: number) => (
                <SelectItem
                  style={{
                    backgroundColor:
                      customSearch.id === selectedCustomPlaceId
                        ? "#FFE793"
                        : "",
                  }}
                  key={idx}
                  onClick={() => selectSearchPlaceHandler(customSearch)}
                >
                  <p style={{ fontSize: 16, fontWeight: "bold" }}>
                    {customSearch.place_name}
                  </p>
                  <p style={{ color: "grey", fontSize: 12 }}>
                    {customSearch.road_address_name}
                  </p>
                </SelectItem>
              ))}
          </Stack>
        </ModalScrollableBox>
      </Stack>
    </Modal>
  );
}

const mapStateToProps = ({ createFullCourse }: any) => {
  return {
    fullCourseList: createFullCourse.fullCourseList,
    fullCourseId: createFullCourse.fullCourseId,
    fullCourseDate: createFullCourse.fullCourseDate,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createCustomPlace: (newPlace: CustomPlaceInfoProps) =>
      dispatch(createCustomPlace(newPlace)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomPlaceModal);
