import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  styled,
  Stack,
  Paper,
  Icon,
} from "@mui/material";
import { connect } from "react-redux";
import { deleteSchedule } from "../../../redux/createFullCourse/actions";
import { setSelectedScheduleId } from "../../../redux/schedule/actions";
import { PlaceCardProps } from "../../../types/main";
import StarScore from "../../Main/StarScore";
import noImage from "../../../assets/img/logo_with_text.png";

const CardStyle = styled(Card)(() => ({
  textAlign: "left",
  display: "flex",
  justifyContent: "start",
  zIndex: 100,
  width: 350,
  position: "relative",
  "&:hover": {
    backgroundColor: "#FFEFB5",
  },
}));

const CardMediaStyle = styled(CardMedia)(() => ({
  minWidth: 100,
  minHeight: 100,
  width: "100%",
  height: "100%",
}));

const PlaceNameStyle = styled("h3")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
}));

const PlaceAddressNameStyle = styled("p")(() => ({
  color: "grey",
  fontSize: 12,
  marginTop: 8,
  marginBottom: 8,
}));

function DailyFullCourseCard({
  day,
  seq,
  selectedScheduleId,
  placeId,
  scheduleId,
  category,
  name,
  thumbnail,
  address,
  averageScore,
  keywords = [],
  setSelectedScheduleId,
  deleteSchedule,
}: Props & PlaceCardProps & { day: number; seq: number }) {
  const newKeywords: Array<string> = keywords.slice(0, 3);

  const onClickHandler = () => {
    console.log("카드클릭클릭", scheduleId);
    if (scheduleId !== undefined) {
      setSelectedScheduleId(scheduleId);
    }
  };
  return (
    // 카테고리 별로 이동경로가 달라야 함
    <CardStyle
      sx={{
        backgroundColor: selectedScheduleId === scheduleId ? "#FFE793" : "",
        // color: selectedScheduleId === scheduleId ? "white" : "",
      }}
      onClick={onClickHandler}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Paper
          sx={{ margin: 1, minHeight: 100, width: "100%", padding: 0.5 }}
          square
        >
          <CardMediaStyle
            image={
              thumbnail === " "
                ? "https://www.chanchao.com.tw/images/default.jpg"
                : thumbnail === ""
                ? "https://www.chanchao.com.tw/images/default.jpg"
                : thumbnail
            }
            title={name}
          />
        </Paper>
      </div>
      <CardContent sx={{ width: "100%" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <PlaceNameStyle>{name}</PlaceNameStyle>
              <StarScore
                starScore={averageScore}
                fontSize={16}
                starSize={20}
              ></StarScore>
            </div>
            <Icon
              onClick={() =>
                deleteSchedule({
                  day: day,
                  sequence: seq,
                  scheduleId: scheduleId || 0,
                })
              }
            >
              delete
            </Icon>
          </div>
          <PlaceAddressNameStyle>{address}</PlaceAddressNameStyle>
        </div>
        <Stack direction="row" spacing={1}>
          {newKeywords.map((item, key) => (
            <Chip sx={{ fontSize: 12 }} key={key} label={`#${item}`} />
          ))}
        </Stack>
      </CardContent>
    </CardStyle>
  );
}

const mapStateToProps = ({ schedule }: any) => {
  return {
    selectedScheduleId: schedule.selectedScheduleId,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedScheduleId: (scheduleId: number) =>
      dispatch(setSelectedScheduleId(scheduleId)),
    deleteSchedule: ({
      day,
      sequence,
      scheduleId,
    }: {
      day: number;
      sequence: number;
      scheduleId: number;
    }) => dispatch(deleteSchedule({ day, sequence, scheduleId })),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyFullCourseCard);
