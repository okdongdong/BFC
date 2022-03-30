import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ChangeUserInfo from "./ChangeUserInfo";
import ChangePassword from "./ChangePassword";
function ChangeData() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", marginTop: "50px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            centered
            aria-label="lab API tabs example"
          >
            <Tab label="회원정보수정" value="1" />
            <Tab label="비밀번호수정" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{/* <ChangeUserInfo></ChangeUserInfo> */}</TabPanel>
        <TabPanel value="2">
          <ChangePassword></ChangePassword>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
export default ChangeData;
