import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarScore from "./StarScore";

import { PlaceCardProps } from "../../types/main";
import { useEffect, useRef, useState } from "react";

const CardStyle = styled(Card)(() => ({
  width: 240,
  borderRadius: "25px",
  textAlign: "left",
  marginRight: 15,
  marginLeft: 15,
}));

const CardMediaStyle = styled(CardMedia)(() => ({
  height: 200,
}));

const PlaceNameStyle = styled("h2")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
}));

const PlaceAddressNameStyle = styled("p")(() => ({
  fontSize: 16,
  color: "grey",
  marginTop: 8,
  marginBottom: 8,
}));

function PlaceCard({
  placeId,
  category,
  name,
  thumbnail,
  address,
  averageScore,
  label,
}: PlaceCardProps) {
  const navigate = useNavigate();
  const interSectRef = useRef<HTMLDivElement>(null);

  const [isVisible, setVisible] = useState(false);

  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 0.5,
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
      <CardStyle
        onClick={() =>
          navigate(`/${category ? "restaurant" : "attraction"}/${placeId}`)
        }
      >
        <CardActionArea>
          <CardMediaStyle
            image={
              thumbnail || "https://www.chanchao.com.tw/images/default.jpg"
            }
            title={name}
          />
          <CardContent>
            <PlaceNameStyle>
              {name}
              <StarScore starScore={averageScore.toFixed(2)}></StarScore>
            </PlaceNameStyle>
            <PlaceAddressNameStyle>{address}</PlaceAddressNameStyle>
            <Chip label={`#${label}`} />
          </CardContent>
        </CardActionArea>
      </CardStyle>
    </div>
  );
}

export default PlaceCard;
