import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { ScheduleData } from "../../../types/detail";
import { Link } from "react-router-dom";
type dayProps = {
  idx: number;
  days: number;
};
function FullCourseSchedule({ idx, steps }: dayProps & Props) {
  const test: any = [];
  if (steps) {
    for (let i = 0; i < steps.length; i++) {
      let scheduleDetail: ScheduleData | null = steps[i];
      if (scheduleDetail !== null) {
        while (scheduleDetail.day > test.length) {
          test.push([]);
        }
        test[scheduleDetail.day - 1].push(scheduleDetail);
      }
    }
  }
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Stepper orientation="vertical">
        {test[idx].map((step: ScheduleData, index: number) => (
          <Step key={index} active={true}>
            <StepLabel></StepLabel>
            <StepContent>
              <Typography style={{ display: "flex", alignItems: "center" }}>
                <Link
                  to={`/place/${step.placeId}`}
                  style={{ textDecoration: "none" }}
                >
                  {step.thumbnail ? (
                    <img
                      src={step.thumbnail}
                      style={{
                        width: "300px",
                        height: "180px",
                        marginRight: "20px",
                      }}
                      alt=""
                    />
                  ) : (
                    <img
                      src="https://www.chanchao.com.tw/images/default.jpg"
                      style={{
                        width: "300px",
                        height: "180px",
                        marginRight: "20px",
                      }}
                      alt=""
                    />
                  )}
                </Link>

                <div>
                  <div>{step.name}</div>
                  <div>{step.address}</div>
                  <div>
                    MEMO:{" "}
                    {step.memo ? (
                      <>{step.memo}</>
                    ) : (
                      <>메모한 내용이 없습니다.</>
                    )}
                  </div>
                </div>
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
const mapStateToProps = ({ fullCourse }: any) => {
  return {
    steps: fullCourse.scheduleDetailList,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(FullCourseSchedule);
