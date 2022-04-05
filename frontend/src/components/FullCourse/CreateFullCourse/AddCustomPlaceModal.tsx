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
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toStringByFormatting } from "../../../layouts/CreateFullCourseNavbar";
import { createCustomPlace } from "../../../redux/createFullCourse/actions";
import { CustomPlaceInfoProps } from "../../../redux/createFullCourse/types";
import ScrollableBox from "../ScrollableBox";
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
  const [location, setLocation] = useState({
    lat: 35.1797913,
    lng: 129.074987,
  });

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
      lng: location.lng,
      day: day,
      sequence: fullCourseList[day].length,
      fullCourseId: fullCourseId,
    };

    createCustomPlace(customPlaceInfo);
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
      <Stack sx={{ width: "max(40%, 600px)", height: "80%" }}>
        <div
          style={{
            width: "100%",
            height: 80,
            backgroundColor: "#47A3EC",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            color: "white",
            borderRadius: "5px 5px 0 0",
            zIndex: 1200,
          }}
        >
          <h1 style={{ marginLeft: 100 }}>나만의 장소 추가</h1>
        </div>
        <ScrollableBox width={"100%"}>
          <Stack
            spacing={2}
            sx={{
              width: "400px",
              margin: "auto",
            }}
          >
            <TextField
              label="장소명"
              fullWidth
              onChange={placeNameChangeHandler}
            ></TextField>
            <TextField
              label="장소주소"
              fullWidth
              onChange={placeAddressChangeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Icon>search</Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>

            <MapContainer>
              <ModalKakaoMap
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
        </ScrollableBox>
        <div
          style={{
            width: "100%",
            height: 80,
            backgroundColor: "#fff",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            color: "white",
            borderRadius: "0 0 5px 5px",
            zIndex: 1200,
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            sx={{
              paddingTop: 3,
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
        </div>
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
