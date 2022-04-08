import { Container, Stack } from "@mui/material";

function Footer() {
  return (
    <div
      style={{
        width: "100%",
        height: 250,
        marginTop: 100,
        paddingTop: 50,
        paddingBottom: 50,
        backgroundColor: "#333333",
        color: "#eeeeee",
      }}
    >
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: "flex",
          textAlign: "left",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={3}>
          <div>
            <div style={{ fontSize: 48, fontWeight: "bolder" }}>
              Busan Full Course
            </div>
            <div style={{ color: "#999999" }}>
              ⓒ 2022. 강알리 등킨드나쓰 All rights reserved.
            </div>
          </div>
          <div></div>
          <div>
            <div style={{ fontSize: 32, fontWeight: "bolder" }}>Contact</div>
            <div style={{ color: "#999999" }}>busanfullcourse@gmail.com</div>
          </div>
        </Stack>
        <Stack spacing={3}>
          <div>
            <div style={{ fontSize: 32, fontWeight: "bold" }}>SSAFY 6th.</div>
            <div style={{ color: "#999999" }}>특화프로젝트 - 빅데이터 추천</div>
            <div style={{ color: "#999999" }}>부산 강서구 녹산산업중로 333</div>
          </div>

          <div></div>
          <div>
            <div style={{ fontSize: 20, fontWeight: "bold" }}>
              부울경 2반 1조
            </div>
            <Stack direction="row" spacing={4}>
              <div>
                <Stack direction="row" spacing={1}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#999999",
                    }}
                  >
                    FE
                  </div>
                  <div>강동옥</div>
                  <div>전호정</div>
                </Stack>
              </div>
              <div>
                <Stack direction="row" spacing={1}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#999999",
                    }}
                  >
                    BE
                  </div>
                  <div>양지훈</div>
                  <div>정성우</div>
                </Stack>
              </div>
              <div>
                <Stack direction="row" spacing={1}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#999999",
                    }}
                  >
                    DATA
                  </div>
                  <div>김도훈</div>
                  <div>김태현</div>
                </Stack>
              </div>
            </Stack>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default Footer;
