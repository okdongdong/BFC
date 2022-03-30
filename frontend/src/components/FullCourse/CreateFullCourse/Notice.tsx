import { Alert, Collapse } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { errorControl } from "../../../redux/createFullCourse/actions";

function Notice({ nowError, errorMessage, errorControl }: Props) {
  useEffect(() => {
    if (nowError) {
      const autoClose = setTimeout(() => errorControl(false), 3000);
      return () => {
        clearTimeout(autoClose);
      };
    }
  }, [nowError]);

  const onCloseHandler = () => {
    errorControl(false);
  };

  return (
    <div>
      <Collapse
        in={nowError}
        sx={{ position: "absolute", top: 80, width: "100%", zIndex: 1200 }}
      >
        <Alert onClose={onCloseHandler} severity="error">
          {errorMessage}
        </Alert>
      </Collapse>
    </div>
  );
}

const mapStateToProps = ({ createFullCourse }: any) => ({
  nowError: createFullCourse.nowError,
  errorMessage: createFullCourse.errorMessage,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    errorControl: (newState: boolean) => dispatch(errorControl(newState)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
