import { Box, Icon, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface StarScorePorps {
  starScore: number;
}

const StarScoreBoxStlye = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
}));

const StarScoreStyle = styled("span")(() => ({
  fontSize: 20,
  fontWeight: "bold",
}));

const useStyles = makeStyles(() => ({
  scoreStar: { color: "orange", fontSize: 32 },
}));

function StarScore({ starScore }: StarScorePorps) {
  const classes = useStyles();

  return (
    <StarScoreBoxStlye>
      <Icon className={classes.scoreStar}>star</Icon>
      <StarScoreStyle>{starScore}</StarScoreStyle>
    </StarScoreBoxStlye>
  );
}

export default StarScore;
