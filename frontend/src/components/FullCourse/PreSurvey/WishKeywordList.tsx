import { Chip, Stack } from "@mui/material";
import React from "react";

interface WishKeywordListProps {
  listLabel?: string;
  wishKeywordList: Array<string>;
  setWishKeywordList: React.Dispatch<React.SetStateAction<string[]>>;
}

function WishKeywordList({
  listLabel = "",
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
      <div>{listLabel}</div>
      <Stack direction="row" spacing={1}>
        {wishKeywordList.map((keyword, idx) => (
          <Chip
            variant="outlined"
            label={keyword}
            key={idx}
            onDelete={() => onDeleteHandler(idx)}
          ></Chip>
        ))}
      </Stack>
    </div>
  );
}

export default WishKeywordList;
