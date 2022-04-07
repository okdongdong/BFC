import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { customAxios } from "../../../../lib/customAxios";

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
interface content {
  label: string;
  thumbnail: string;
  placeId: number; //풀코스 id 변수명 확인 후 바꿔야함
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
  // useEffect
  useEffect(() => {
    getInfo(page);
    setPage(page + 1);
  }, []);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [contentList]);
  function getUrl() {
    if (type) {
      setUrl(`/users/${profileUserId}/userFullCourse`);
    } else {
      setUrl(`/users/${profileUserId}/likeFullCourse`);
    }
  }
  const getInfo = async (page: number) => {
    const res = await customAxios({
      method: "get",
      url: `/users/${profileUserId}/like`,
      params: {
        page: page,
        size: 8,
      },
    });
    // 서버에서 데이터 가져오기
    console.log("더보기가져옴", res);
    setTotalPage(res.data.totalPages);
    setPage(page + 1);
    setContentList((curContentList) => [
      ...curContentList,
      ...res.data.content,
    ]); // state에 추가
  };
  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      console.log(totalPage, page);
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
              alignItems: "center",

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
                  <Link
                    to={`/place/${item.placeId}`} //풀코스 디테일로 바꿔야함!
                    style={{ textDecoration: "none" }}
                  >
                    <div style={Box2} ref={boxRef} key={index}>
                      <div
                        key={index}
                        style={{
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            margin: "10px",
                            // marginRight: "10px",
                            // marginLeft: "10px",
                            borderRadius: "10px",
                          }}
                          src={item.thumbnail}
                          alt="fullCourseImg"
                        ></img>
                        <div
                          style={{
                            width: "200px",
                            height: "200px",
                            marginRight: "10px",
                            marginLeft: "10px",
                            borderRadius: "10px",
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            top: 0,
                            left: 0,
                          }}
                        >
                          <p style={{ color: "white" }}>#{item.label}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              } else {
                // 관찰되는 요소가 없는 html
                return (
                  <Link
                    to={`/place/${item.placeId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={Box2} key={index}>
                      <div
                        key={index}
                        style={{
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            margin: "10px",
                            // marginRight: "10px",
                            // marginLeft: "10px",
                            borderRadius: "10px",
                          }}
                          src={item.thumbnail}
                          alt="fullCourseImg"
                        ></img>
                        <div
                          style={{
                            width: "200px",
                            height: "200px",
                            marginRight: "10px",
                            marginLeft: "10px",
                            borderRadius: "10px",
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            top: 0,
                            left: 0,
                          }}
                        >
                          <p style={{ color: "white" }}>#{item.label}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
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
