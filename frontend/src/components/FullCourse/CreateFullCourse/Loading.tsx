import { Backdrop, CircularProgress } from "@mui/material";
import { connect } from "react-redux";

const Loading = ({ nowLoading }: Props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={nowLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const mapStateToProps = ({ baseInfo }: any) => ({
  nowLoading: baseInfo.nowLoading,
});

type Props = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(Loading);
