import { CardMedia, Grid, styled } from "@mui/material";

interface FullCouresThumbnailProps {
  thumbnailList: string[];
}

const FullCouresThumbnailGridStyle = styled(Grid)(() => ({ height: 200 }));

const CardMediaStyle = styled(CardMedia)(() => ({
  height: "100%",
  width: "100%",
}));

function FullCouresThumbnail({ thumbnailList }: FullCouresThumbnailProps) {
  const isThumbnail3 = thumbnailList.length === 3;

  return (
    <FullCouresThumbnailGridStyle container>
      {thumbnailList.map((thumbnail, idx) => (
        <Grid
          item
          key={idx}
          xs={isThumbnail3 && idx === 2 ? 12 : 6}
          alignItems="stretch"
        >
          <CardMediaStyle image={thumbnail} title={`코스-${idx}`} />
        </Grid>
      ))}
    </FullCouresThumbnailGridStyle>
  );
}
export default FullCouresThumbnail;
