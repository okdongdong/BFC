import { Icon, Stack, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toStringByFormatting } from "../../../layouts/CreateFullCourseNavbar";
import { setFullCourseDate } from "../../../redux/createFullCourse/actions";
import ScrollableBox from "../ScrollableBox";

function DayBar({
  fullCourseDate,
  setFullCourseDate,
  pickedDay,
  setPickedDay,
  setDayChange,
}: Props & {
  pickedDay: number;
  setPickedDay: React.Dispatch<React.SetStateAction<number>>;
  setDayChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dayList, setDayList] = useState<Array<string>>([]);
  const startDate: Date = new Date(fullCourseDate[0]);
  const endDate: Date = new Date(fullCourseDate[1]);
  const DayTextStyle = styled("div")((attr: { idx: number }) => ({
    backgroundColor: `${attr.idx === pickedDay ? "#47A3EC" : "white"}`,
    color: `${attr.idx !== pickedDay || "white"}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    width: 80,
    position: "relative",
    fontSize: 20,
    fontWeight: "bold",
  }));
  const DayTextBox = styled("div")(() => ({
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
    fontSize: 20,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#47A3EC",
    },
  }));

  // 풀코스 일정 길이 계산
  const calDayLength = () => {
    if (startDate !== null && endDate !== null) {
      const diffDate = startDate.getTime() - endDate.getTime();
      const dayLength = Math.abs(diffDate / (1000 * 3600 * 24)) + 1;
      const temp: Array<string> = [];

      for (let i = 1; i <= dayLength; i++) {
        temp.push(`DAY${i}`);
      }
      setDayList(() => temp);
    } else {
      setDayList(() => []);
    }
  };

  // 일정 하루 추가
  const addDate = () => {
    if (startDate !== null && endDate !== null) {
      const nextDate = new Date(endDate.setDate(endDate.getDate() + 1));
      setFullCourseDate([
        toStringByFormatting(startDate),
        toStringByFormatting(nextDate),
      ]);
    } else {
      setFullCourseDate([
        toStringByFormatting(new Date()),
        toStringByFormatting(new Date()),
      ]);
    }
  };

  useEffect(() => {
    calDayLength();
  }, [fullCourseDate]);

  const dayChangeHandler = (idx: number) => {
    setDayChange(true);
    setPickedDay(idx);
  };

  return (
    <ScrollableBox
      height="calc(100vh - 80px)"
      width={100}
      backgroundColor="#ddd"
    >
      {dayList.map((day, idx) => (
        <DayTextBox key={idx} onClick={() => dayChangeHandler(idx)}>
          <DayTextStyle idx={idx}>
            <p style={{ margin: 0 }}>{day}</p>
          </DayTextStyle>
        </DayTextBox>
      ))}
      <DayTextBox>
        <DayTextStyle idx={-1}>
          <p>
            <Icon sx={{ fontSize: 30 }} onClick={addDate}>
              add
            </Icon>
          </p>
        </DayTextStyle>
      </DayTextBox>
    </ScrollableBox>
  );
}

const mapStateToProps = ({ createFullCourse }: any) => ({
  fullCourseDate: createFullCourse.fullCourseDate,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    setFullCourseDate: (newDate: Array<string | null>) =>
      dispatch(setFullCourseDate(newDate)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(DayBar);
