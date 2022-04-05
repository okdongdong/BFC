import { Alert, Collapse } from "@mui/material";
import { connect } from "react-redux";

function Notice({ nowError, errorMessage }: Props) {
  return (
    <div>
      <Collapse
        in={nowError}
        sx={{ position: "absolute", top: 80, width: "100%", zIndex: 1200 }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Collapse>
    </div>
  );
}

const mapStateToProps = ({ baseInfo }: any) => ({
  nowError: baseInfo.nowError,
  errorMessage: baseInfo.errorMessage,
});

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Notice);
