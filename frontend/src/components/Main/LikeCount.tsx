import { Box, Icon, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface LikeCountProps {
  likeCount: number;
}

function LikeCount({ likeCount }: LikeCountProps) {
  const LikeCountBoxStlye = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
  }));

  const LikeCountStyle = styled("h2")(() => ({
    fontSize: 16,
  }));

  const useStyles = makeStyles(() => ({
    favoriteHeart: { color: "red", fontSize: 24 },
  }));

  const classes = useStyles();

  return (
    <LikeCountBoxStlye>
      <Icon className={classes.favoriteHeart}>favorite</Icon>
      <LikeCountStyle>{likeCount}</LikeCountStyle>
    </LikeCountBoxStlye>
  );
}
export default LikeCount;
