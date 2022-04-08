import {
  alpha,
  AppBar,
  Box,
  Button,
  Menu,
  styled,
  Toolbar,
} from "@mui/material";
import { connect } from "react-redux";
import { AccountReducer } from "../redux/rootReducer";
import Logo from "../components/Navbar/LogoWhite";
import NavbarText from "../components/Navbar/NavbarText";
import DatePicker from "../components/FullCourse/CreateFullCourse/DatePicker";
import { useState } from "react";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";

// 헤더 화면 (상단 메뉴바)
const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha("#0787EC", 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: 80,
  padding: "0px !important",
  letterSpacing: "0px",
  width: "100%",
}));

// Date를 yyyy-MM-dd로 변환해주는 함수
export const toStringByFormatting = (
  source: Date | string | null,
  delimiter: string = "-"
) => {
  if (source === null) {
    return null;
  }

  if (typeof source === "string") {
    return source.split("-").join(delimiter);
  }

  const year = source.getFullYear();
  const tempMonth = source.getMonth() + 1;
  const tempDay = source.getDate();
  const month = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
  const day = tempDay < 10 ? `0${tempDay}` : tempDay;
  return [year, month, day].join(delimiter);
};

const CreateFullCourseNavbar = ({
  isLogin,
  nickname,
  profileImg,
  fullCourseDate,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDatePicker = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(typeof handleClose);

  const dateRangeToString = (dateRange: DateRange<Date>) => {
    const [startDate, endDate]: DateRange<Date> = dateRange;

    if (startDate !== null && endDate !== null) {
      return `${toStringByFormatting(startDate, ".")} ~ 
      ${toStringByFormatting(endDate, ".")}`;
    } else if (startDate !== null) {
      return `${toStringByFormatting(startDate, ".")} ~`;
    } else if (endDate !== null) {
      return `~ ${toStringByFormatting(endDate, ".")}`;
    }
    return "날짜정보없음";
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />
        <Logo />
        <Button sx={{ color: "white" }} onClick={handleClick}>
          {dateRangeToString(fullCourseDate)}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openDatePicker}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <DatePicker closePicker={handleClose}></DatePicker>
        </Menu>

        <Box sx={{ flexGrow: 10 }} />
        {isLogin ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <img
                src={profileImg}
                alt="profileImg"
                style={{ width: 48, height: 48, borderRadius: "50%" }}
              />
            </Box>
            <NavbarText
              color="white"
              to={`/profile/${nickname}`}
              text={`${nickname} 님`}
            ></NavbarText>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <NavbarText color="white" to="/signup" text="회원가입"></NavbarText>
            <NavbarText color="white" to="/login" text="로그인"></NavbarText>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
      </ToolbarStyle>
    </RootStyle>
  );
};

const mapStateToProps = ({ account, createFullCourse }: AccountReducer) => ({
  isLogin: account.isLogin,
  nickname: account.nickname,
  profileImg: account.profileImg,
  fullCourseDate: createFullCourse.fullCourseDate,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFullCourseNavbar);
