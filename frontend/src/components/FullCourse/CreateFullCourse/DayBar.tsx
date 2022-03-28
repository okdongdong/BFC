import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { Box, Icon, Stack, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setFullCourseDate } from "../../../redux/createFullCourse/actions";

const ContentBox = styled(Stack)(() => ({
  height: "calc(100vh - 80px)",
  width: 100,
  backgroundColor: "#a2a2a2",
  position: "relative",
  alignItems: "center",
  overflowY: "auto",
  /* 스크롤바 설정*/
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  /* 스크롤바 막대 설정*/
  "&::-webkit-scrollbar-thumb": {
    height: "17%",
    backgroundColor: "rgba(33,133,133,1)",
    borderRadius: " 10px",
  },
  /* 스크롤바 뒷 배경 설정*/
  "&::-webkit-scrollbar-track": {
    backgroundColor: " rgba(33,133,133,0.33)",
  },
}));

const DayTextStyle = styled("div")(() => ({
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "25px",
  height: 60,
  marginTop: 5,
  marginBottom: 5,
  width: 80,
  position: "relative",
  fontSize: 20,
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#47A3EC",
    color: "white",
  },
}));

function DayBar({ fullCourseDate, setFullCourseDate }: Props) {
  const [dayList, setDayList] = useState<Array<string>>([]);
  const [startDate, endDate]: DateRange<Date> = fullCourseDate;
  console.log(fullCourseDate);

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

  const addDate = () => {
    if (startDate !== null && endDate !== null) {
      const nextDate = new Date(endDate.setDate(endDate.getDate() + 1));
      setFullCourseDate([startDate, nextDate]);
    } else {
      setFullCourseDate([new Date(), new Date()]);
    }
  };

  useEffect(() => {
    calDayLength();
  }, [fullCourseDate]);

  return (
    <ContentBox>
      {dayList.map((day, idx) => (
        <DayTextStyle key={idx}>
          <p>{day}</p>
        </DayTextStyle>
      ))}
      <DayTextStyle>
        <p>
          <Icon sx={{ fontSize: 30 }} onClick={addDate}>
            add
          </Icon>
        </p>
      </DayTextStyle>
    </ContentBox>
  );
}

const mapStateToProps = ({ createFullCourse }: any) => ({
  fullCourseDate: createFullCourse.fullCourseDate,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    setFullCourseDate: (newDate: DateRange<Date>) =>
      dispatch(setFullCourseDate(newDate)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(DayBar);
