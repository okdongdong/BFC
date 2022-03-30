export interface UserInfo {
  username: string;
  nickname: string;
  birthday: Date | null;
  gender: number; // 남자: 1, 여자: 0
  profileImg?: string | null | undefined;
}

export interface NavUserInfo {
  userId: number;
  nickname: string;
  profileImg?: string | null | undefined;
}

export interface LoginUserInfo {
  username: string;
  password: string;
}

export interface SetPasswordInfo {
  username: string;
  oldPassword: string;
  newPassword: string;
  passwordCheck: string;
  [key: string]: any;
}

export interface SetUserInfo {
  username: string;
  nickname: string;
  gender: number;
  birthday: string;
  [key: string]: any;
}

export interface SignupUserInfo {
  username: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
  birthday: Date | null;
  gender: number; // 남자: 1, 여자: 0
  agreement: boolean; // 약관동의
  profileImg?: string | null | undefined;
  [key: string]: any; // 이거를 쓰면 ts를 쓰는 의미가 없긴한데 일단 오류를 해결하기 위해 사용
}
