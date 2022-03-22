import { Box, Icon, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface StarScorePorps {
  starScore: number;
}

function StarScore({ starScore }: StarScorePorps) {
  const StarScoreBoxStlye = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
  }));

  const StarScoreStyle = styled("span")(() => ({
    fontSize: 20,
    fontWeight: "bold",
  }));

  const useStyles = makeStyles(() => ({
    scoreStar: { color: "orange", fontSize: 32 },
  }));

  const classes = useStyles();

  return (
    <StarScoreBoxStlye>
      <Icon className={classes.scoreStar}>star</Icon>
      <StarScoreStyle>{starScore}</StarScoreStyle>
    </StarScoreBoxStlye>
  );
}

export default StarScore;
