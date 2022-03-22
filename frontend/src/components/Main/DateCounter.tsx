import { Card, styled } from "@mui/material";

interface DateCounterProps {
  startOn: Date;
  finishedOn: Date;
}

const CardStyle = styled(Card)(() => ({
  width: 70,
  borderRadius: "25px",
  textAlign: "center",
  marginLeft: 10,
  padding: 10,
}));

const DayCountStyle = styled("span")(() => ({
  fontSize: 48,
  fontWeight: "bold",
}));

function DateCounter({ startOn, finishedOn }: DateCounterProps) {
  const dayToMilisec = 1000 * 3600 * 24;
  const dayDiff = Math.ceil(
    (finishedOn.getTime() - startOn.getTime()) / dayToMilisec
  );

  return (
    <CardStyle>
      <DayCountStyle>{dayDiff}</DayCountStyle>
      <br />
      <span>{dayDiff === 1 ? "DAY" : "DAYS"}</span>
    </CardStyle>
  );
}

export default DateCounter;
