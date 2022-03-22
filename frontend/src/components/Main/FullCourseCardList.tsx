import { styled } from "@mui/material";
import { FullCourseListProps } from "../../types/Main";
import FullCourseCard from "./FullCourseCard";

const TitleTextStyle = styled("h1")(() => ({
  fontSize: 32,
  marginBottom: 36,
}));

const FullCourseCardListStyle = styled("div")(() => ({
  justifyContent: "center",
  display: "flex",
}));

function FullCourseCardList({ fullCourseList, title }: FullCourseListProps) {
  return (
    <div>
      <TitleTextStyle>{title}</TitleTextStyle>
      <FullCourseCardListStyle>
        {fullCourseList.map((fullCourse, idx) => (
          <FullCourseCard
            key={idx}
            fullCourseId={fullCourse.fullCourseId}
            title={fullCourse.title}
            thumbnailList={fullCourse.thumbnailList}
            startOn={fullCourse.startOn}
            finishedOn={fullCourse.finishedOn}
            views={fullCourse.views}
          ></FullCourseCard>
        ))}
      </FullCourseCardListStyle>
    </div>
  );
}

export default FullCourseCardList;
