import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataTosubmit: React.ChangeEvent<HTMLInputElement>) {
  // 서버에서 받은 data를 request에 저장
  const request = axios
    .post("", dataTosubmit)
    .then((response) => response.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
