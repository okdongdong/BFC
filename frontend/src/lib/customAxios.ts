import axios, { AxiosInstance } from "axios";

// header의 type에러 방지 위해 null일 경우 빈 문자열 할당
const token = localStorage.getItem("accessToken") || "";

export const customAxios: AxiosInstance = axios.create({
  // baseURL이 작성되어있으므로 뒷부분만 작성해서 사용하면 됨
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`,
  headers: {
    Authorization: token,
  },
});

// 리프레쉬 토큰 처리
// 추후 할 예정 => Axios.Interceptor이용