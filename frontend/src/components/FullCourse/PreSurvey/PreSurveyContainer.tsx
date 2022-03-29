import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { toStringByFormatting } from "../../../layouts/CreateFullCourseNavbar";
import { creatNewFullCourse } from "../../../redux/createFullCourse/actions";
import { CreateFullCourseRequestData } from "../../../redux/createFullCourse/types";

import DatePicker from "../CreateFullCourse/DatePicker";
import CompanionList from "./CompanionList";
import IsPublicButton from "./IsPublicButton";
import WishKeywordList from "./WishKeywordList";

function PreSuveyContainer({ fullCourseDate, creatNewFullCourse }: Props) {
  const [title, setTitle] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [meogEoBoJaList, setMeogEoBoJaList] = useState<Array<string>>([]);
  const [gaBoJaList, setGaBoJa] = useState<Array<string>>([]);
  const [companionList, setCompanionList] = useState<Array<string>>([]);

  // 풀코스 제목 변경 핸들러
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // 풀코스 생성버튼 핸들러
  const onClickHandler = () => {
    const startedOn = toStringByFormatting(fullCourseDate[0]);
    const finishedOn = toStringByFormatting(fullCourseDate[1]);

    const data: CreateFullCourseRequestData = {
      title: title,
      isPublic: isPublic,
      startedOn: startedOn,
      finishedOn: finishedOn,
      wishFoodKeywords: meogEoBoJaList,
      wishPlaceKeywords: gaBoJaList,
    };

    creatNewFullCourse(data);
  };

  return (
    <div>
      공개범위
      <IsPublicButton setIsPublic={setIsPublic}></IsPublicButton>
      <hr />
      <TextField onChange={onChangeHandler}></TextField>
      여행기간
      <DatePicker></DatePicker>
      <WishKeywordList
        listLabel={"가고싶어요"}
        wishKeywordList={meogEoBoJaList}
        setWishKeywordList={setMeogEoBoJaList}
      ></WishKeywordList>
      <WishKeywordList
        listLabel={"먹고싶어요"}
        wishKeywordList={gaBoJaList}
        setWishKeywordList={setGaBoJa}
      ></WishKeywordList>
      <CompanionList
        companionList={companionList}
        setCompanionList={setCompanionList}
        listLabel={"함께 떠나자~!"}
      ></CompanionList>
      <Button onClick={onClickHandler}>풀코스 생성</Button>
    </div>
  );
}

const mapStateToProps = ({ createFullCourse }: any) => {
  return { fullCourseDate: createFullCourse.fullCourseDate };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    creatNewFullCourse: (fullCourseInfo: CreateFullCourseRequestData) =>
      dispatch(creatNewFullCourse(fullCourseInfo)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(PreSuveyContainer);
