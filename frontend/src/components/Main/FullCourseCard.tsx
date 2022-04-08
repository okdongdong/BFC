import { Box, Card, CardActionArea, CardContent, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullCourseProps } from "../../types/main";
import DateCounter from "./DateCounter";
import FullCouresThumbnail from "./FullCourseThumbnail";
import LikeCount from "./LikeCount";

const CardStyle = styled(Card)(() => ({
  width: 240,
  borderRadius: "25px",
  textAlign: "left",
  marginRight: 15,
  marginLeft: 15,
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
  startedOn,
  finishedOn,
  views,
}: FullCourseProps) {
  const navigate = useNavigate();
  const interSectRef = useRef<HTMLDivElement>(null);

  const [isVisible, setVisible] = useState(false);

  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 0.8,
  };

  const handleObserver = async (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && !isVisible) {
      setVisible(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (interSectRef.current !== null) {
      observer.observe(interSectRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    // 카테고리 별로 이동경로가 달라야 함
    <div
      ref={interSectRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      style={{ padding: 5 }}
    >
      <CardStyle onClick={() => navigate(`/fullcourseDetail/${fullCourseId}`)}>
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
            <DateCounter
              startedOn={new Date(startedOn)}
              finishedOn={new Date(finishedOn)}
            ></DateCounter>
          </CardContentStyle>
        </CardActionArea>
      </CardStyle>
    </div>
  );
}
export default FullCourseCard;
