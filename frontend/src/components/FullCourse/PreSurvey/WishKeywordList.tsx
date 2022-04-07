import { Chip, Grid, Stack } from "@mui/material";
import React from "react";

interface WishKeywordListProps {
  wishKeywordList: Array<string>;
  setWishKeywordList: React.Dispatch<React.SetStateAction<string[]>>;
}

function WishKeywordList({
  wishKeywordList,
  setWishKeywordList,
}: WishKeywordListProps) {
  const onDeleteHandler = (idx: number) => {
    const newWishKeywordList = [...wishKeywordList];
    newWishKeywordList.splice(idx, 1);
    setWishKeywordList(newWishKeywordList);
  };

  return (
    <div>
      <Grid container spacing={1} style={{ maxWidth: 600 }}>
        {wishKeywordList.map((keyword, idx) => (
          <Grid item key={idx}>
            <Chip
              variant="outlined"
              label={keyword}
              onDelete={() => onDeleteHandler(idx)}
            ></Chip>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default WishKeywordList;
