import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FullCourseProps } from "../../types/Main";
import DateCounter from "./DateCounter";
import FullCouresThumbnail from "./FullCourseThumbnail";
import LikeCount from "./LikeCount";

const CardStyle = styled(Card)(() => ({
  width: 300,
  borderRadius: "25px",
  textAlign: "left",
  marginRight: 10,
}));

const CardMediaStyle = styled(CardMedia)(() => ({
  height: 200,
}));

const CardContentStyle = styled(CardContent)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const FullCourseNameStyle = styled("h2")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
}));

function FullCourseCard({
  fullCourseId,
  title,
  thumbnailList,
  startOn,
  finishedOn,
  views,
}: FullCourseProps) {
  const navigate = useNavigate();

  return (
    <CardStyle onClick={() => navigate(`/fullcourse/${fullCourseId}`)}>
      <CardActionArea>
        <FullCouresThumbnail
          thumbnailList={thumbnailList}
        ></FullCouresThumbnail>
        <CardContentStyle>
          <Box sx={{ alignItems: "center" }}>
            <LikeCount likeCount={views}></LikeCount>
            <FullCourseNameStyle>{title}</FullCourseNameStyle>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <DateCounter startOn={startOn} finishedOn={finishedOn}></DateCounter>
        </CardContentStyle>
      </CardActionArea>
    </CardStyle>
  );
}
export default FullCourseCard;
