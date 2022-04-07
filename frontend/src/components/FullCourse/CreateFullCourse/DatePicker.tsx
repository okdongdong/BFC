import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateRange } from "@mui/lab/DateRangePicker";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import MuiDateRangePickerDay, {
  DateRangePickerDayProps,
} from "@mui/lab/DateRangePickerDay";
import { connect } from "react-redux";
import { setFullCourseDate } from "../../../redux/createFullCourse/actions";
import { Button } from "@mui/material";
import { toStringByFormatting } from "../../../layouts/CreateFullCourseNavbar";

const DateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({ theme, isHighlighting, isStartOfHighlighting, isEndOfHighlighting }) => ({
    ...(isHighlighting && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isStartOfHighlighting && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...(isEndOfHighlighting && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  })
) as React.ComponentType<DateRangePickerDayProps<Date>>;

function DatePicker({
  fullCourseDate,
  setFullCourseDate,
  closePicker,
}: Props & { closePicker?: any }) {
  const renderWeekPickerDay = (
    date: Date,
    dateRangePickerDayProps: DateRangePickerDayProps<Date>
  ) => {
    return <DateRangePickerDay {...dateRangePickerDayProps} />;
  };

  const onChangeHandler = (newValue: DateRange<Date>) => {
    const startedOn = toStringByFormatting(newValue[0]);
    const finishedOn = toStringByFormatting(newValue[1]);
    console.log("------", fullCourseDate);

    setFullCourseDate([startedOn, finishedOn]);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        label="date range"
        value={fullCourseDate}
        onChange={(newValue) => {
          onChangeHandler(newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
      <Button onClick={() => setFullCourseDate([null, null])}>
        일정초기화
      </Button>
      {closePicker === undefined || <Button onClick={closePicker}>닫기</Button>}
    </LocalizationProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
