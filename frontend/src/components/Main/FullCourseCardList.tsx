import { Container, Grid, styled } from "@mui/material";
import { FullCourseListProps } from "../../types/main";
import FullCourseCard from "./FullCourseCard";

const TitleTextStyle = styled("h1")(() => ({
  fontSize: 32,
  marginBottom: 36,
  fontFamily: "Sunflower, sans-serif",
}));

function FullCourseCardList({ fullCourseList, title }: FullCourseListProps) {
  return (
    <div>
      <TitleTextStyle>{title}</TitleTextStyle>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          {fullCourseList.map((fullCourse, idx) => (
            <Grid item xs={6} md={3}>
              <FullCourseCard
                key={idx}
                fullCourseId={fullCourse.fullCourseId}
                title={fullCourse.title}
                thumbnailList={fullCourse.thumbnailList}
                startedOn={fullCourse.startedOn}
                finishedOn={fullCourse.finishedOn}
                views={fullCourse.views}
              ></FullCourseCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default FullCourseCardList;
