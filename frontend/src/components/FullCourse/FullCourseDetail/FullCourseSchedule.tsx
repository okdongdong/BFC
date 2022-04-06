import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";

const steps = [
  [
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODH-NEJacV--c51fyZk9jsUOr6yfKy3-gQQ&usqp=CAU",
      title: "룰루",
      description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODH-NEJacV--c51fyZk9jsUOr6yfKy3-gQQ&usqp=CAU",
      title: "룰루",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODH-NEJacV--c51fyZk9jsUOr6yfKy3-gQQ&usqp=CAU",
      title: "룰루",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
  ],
  [
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMId4q4LpSR-z4ieY-8p45wbW-l-YgYOqqLA&usqp=CAU",
      title: "룰루",
      description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMId4q4LpSR-z4ieY-8p45wbW-l-YgYOqqLA&usqp=CAU",
      title: "룰루",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMId4q4LpSR-z4ieY-8p45wbW-l-YgYOqqLA&usqp=CAU",
      title: "룰루",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
  ],
  [
    {
      imgUrl:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202203/12/b475857f-5707-4dc7-ae02-d4eb88f15c09.jpg",
      title: "룰루",
      description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
      imgUrl:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202203/12/b475857f-5707-4dc7-ae02-d4eb88f15c09.jpg",
      title: "룰루",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      imgUrl:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202203/12/b475857f-5707-4dc7-ae02-d4eb88f15c09.jpg",
      title: "룰루",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
  ],
];
type dayProps = {
  idx: number;
};
function FullCourseSchedule({ idx }: dayProps & Props) {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Stepper orientation="vertical">
        {steps[idx].map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel></StepLabel>
            <StepContent>
              <Typography style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={step.imgUrl}
                  style={{ width: "300px", height: "180px" }}
                  alt=""
                />
                <div>
                  <div>{step.title}</div>
                  {step.description}
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
