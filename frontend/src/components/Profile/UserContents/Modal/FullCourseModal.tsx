import {
  Card,
  CardActionArea,
  CardContent,
  Modal,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { customAxios } from "../../../../lib/customAxios";
import { useNavigate } from "react-router-dom";
import FullCouresThumbnail from "../../../Main/FullCourseThumbnail";
import LikeCount from "../../../Main/LikeCount";
import DateCounter from "../../../Main/DateCounter";

//모달 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "1000px",
  height: "600px",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",

  /* 스크롤바 설정*/
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  /* 스크롤바 막대 설정*/
  "&::-webkit-scrollbar-thumb": {
    height: "17%",
    backgroundColor: "rgba(33,133,133,1)",
    borderRadius: " 10px",
  },
  /* 스크롤바 뒷 배경 설정*/
  "&::-webkit-scrollbar-track": {
    backgroundColor: " rgba(33,133,133,0.33)",
  },
};
const CardStyle = styled(Card)(() => ({
  width: 200,
  borderRadius: "25px",
  textAlign: "left",
  marginRight: 15,
  marginLeft: 15,
}));

const CardContentStyle = styled(CardContent)(() => ({
  display: "flex",
  width: "100%",

  justifyContent: "space-between",
  color: "white",
  position: "absolute",
  marginTop: "-100px",
  // backgroundColor: "white",
  backgroundColor: " rgba(0,0,0,0.5)",
}));

const FullCourseNameStyle = styled("h3")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
}));
interface content {
  fullCourseId: string;
  thumbnailList: Array<string>;
  title: string;
  startedOn: string;
  finishedOn: string;
  likeCnt: number;
}
interface ModalProps {
  open: boolean;
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: number;
}
function FullCourseModal({
  open,
  setOpen,
  title,
  type,
  profileUserId,
}: ModalProps & Props) {
  const [contentList, setContentList] = useState<content[]>([]);
  const observerRef = React.useRef<IntersectionObserver>();
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [totalPage, setTotalPage] = React.useState(9999);
  const [page, setPage] = React.useState(0);
  const [url, setUrl] = React.useState("");
  const navigate = useNavigate();
  // useEffect
  useEffect(() => {
    getInfo(page);
    setPage(page + 1);
  }, []);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [contentList]);

  const getInfo = async (page: number) => {
    if (type) {
      const res = await customAxios({
        method: "get",
        url: `/users/${profileUserId}/userFullCourse`,
        params: {
          page: page,
          size: 8,
        },
      });
      // 서버에서 데이터 가져오기

      setTotalPage(res.data.totalPages);
      setPage(page + 1);
      setContentList((curContentList) => [
        ...curContentList,
        ...res.data.content,
      ]); // state에 추가
    } else {
      const res = await customAxios({
        method: "get",
        url: `/users/${profileUserId}/likedFullCourse`,
        params: {
          page: page,
          size: 8,
        },
      });
      // 서버에서 데이터 가져오기

      setTotalPage(res.data.totalPages);
      setPage(page + 1);
      setContentList((curContentList) => [
        ...curContentList,
        ...res.data.content,
      ]); // state에 추가
    }
  };
  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && page < totalPage) {
        // 관찰하고 있는 entry가 화면에 보여지는 경우
        io.unobserve(entry.target); // entry 관찰 해제
        getInfo(page); // 데이터 가져오기
      }
    });
  };

  const Box2 = {
    border: "1px solid olive",
    borderRadius: "8px",

    boxShadow: "1px 1px 2px olive",

    margin: "18px 0",
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",

              flexWrap: "wrap",
              position: "fixed",
              top: "0",
              left: "0",
              width: "91.5%",
              height: "80%",
              zIndex: "1000",
              marginTop: "100px",
              marginLeft: "90px",
            }}
          >
            {contentList.map((item, index) => {
              if (contentList.length - 4 === index) {
                // 관찰되는 요소가 있는 html, 아래에서 5번째에 해당하는 박스를 관찰
                return (
                  <div style={Box2} ref={boxRef} key={index}>
                    <CardStyle
                      onClick={() =>
                        navigate(`/fullcourseDetail/${item.fullCourseId}`)
                      }
                    >
                      <div style={{ position: "relative" }}>
                        <CardActionArea>
                          <div
                            style={{
                              backgroundColor: " rgba(133,133,133,0.5)",
                            }}
                          >
                            <FullCouresThumbnail
                              thumbnailList={item.thumbnailList}
                            ></FullCouresThumbnail>
                            <CardContentStyle>
                              <Box sx={{ alignItems: "center" }}>
                                <LikeCount likeCount={item.likeCnt}></LikeCount>
                                <FullCourseNameStyle>
                                  {item.title}
                                </FullCourseNameStyle>
                              </Box>
                              <Box sx={{ flexGrow: 1 }} />
                              <DateCounter
                                startedOn={new Date(item.startedOn)}
                                finishedOn={new Date(item.finishedOn)}
                              ></DateCounter>
                              <Box sx={{ flexGrow: 2 }} />
                            </CardContentStyle>
                          </div>
                        </CardActionArea>
                      </div>
                    </CardStyle>
                  </div>
                );
              } else {
                // 관찰되는 요소가 없는 html
                return (
                  <div style={Box2} ref={boxRef} key={index}>
                    <CardStyle
                      onClick={() =>
                        navigate(`/fullcourseDetail/${item.fullCourseId}`)
                      }
                    >
                      <div style={{ position: "relative" }}>
                        <CardActionArea>
                          <div
                            style={{
                              backgroundColor: " rgba(133,133,133,0.5)",
                            }}
                          >
                            <FullCouresThumbnail
                              thumbnailList={item.thumbnailList}
                            ></FullCouresThumbnail>
                            <CardContentStyle>
                              <Box sx={{ alignItems: "center" }}>
                                <LikeCount likeCount={item.likeCnt}></LikeCount>
                                <FullCourseNameStyle>
                                  {item.title}
                                </FullCourseNameStyle>
                              </Box>
                              <Box sx={{ flexGrow: 1 }} />
                              <DateCounter
                                startedOn={new Date(item.startedOn)}
                                finishedOn={new Date(item.finishedOn)}
                              ></DateCounter>
                              <Box sx={{ flexGrow: 3 }} />
                            </CardContentStyle>
                          </div>
                        </CardActionArea>
                      </div>
                    </CardStyle>
                  </div>
                );
              }
            })}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
const mapStateToProps = ({ profile }: any) => {
  return {
    profileUserId: profile.userId,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(FullCourseModal);
