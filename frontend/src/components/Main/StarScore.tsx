import { Box, Icon, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface StarScorePorps {
  starScore: number;
  fontSize?: number | string;
  starSize?: number | string;
}

const StarScoreBoxStlye = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
}));

function StarScore({
  starScore,
  fontSize = 20,
  starSize = 32,
}: StarScorePorps) {
  const useStyles = makeStyles(() => ({
    scoreStar: { color: "orange", fontSize: starSize },
  }));
  const classes = useStyles();

  const StarScoreStyle = styled("span")(() => ({
    fontSize: fontSize,
    fontWeight: "bold",
  }));

  return (
    <StarScoreBoxStlye>
      <Icon className={classes.scoreStar}>star</Icon>
      <StarScoreStyle>{starScore}</StarScoreStyle>
    </StarScoreBoxStlye>
  );
}

export default StarScore;
