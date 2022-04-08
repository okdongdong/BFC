import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import { Box, TextField } from "@mui/material";
import React from "react";

function FullCourseDateRangeInput() {
  const [value, setValue] = React.useState<RangeInput<Date>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DateRangePicker
          calendars={2}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps: any, endProps: any) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}

export default FullCourseDateRangeInput;
