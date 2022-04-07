import { Stack, styled } from "@mui/material";
import { WishKeyword } from "./PreSurveyContainer";

const KeywordItem = styled("div")({
  padding: 2,
  borderRadius: 10,
  "&:hover": {
    backgroundColor: "#0787EC",
    color: "white",
    fontSize: 20,
  },
});

export const SelectWishKeyword = ({
  keywordList,
  setKeywordList,
}: {
  keywordList: WishKeyword[];
  setKeywordList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div>
      <Stack>
        {!keywordList ||
          keywordList.map((item: WishKeyword, idx: number) => (
            <KeywordItem
              key={idx}
              onClick={() => setKeywordList((prev) => [...prev, item.keyword])}
            >
              {item.keyword}
            </KeywordItem>
          ))}
      </Stack>
    </div>
  );
};

export default SelectWishKeyword;
