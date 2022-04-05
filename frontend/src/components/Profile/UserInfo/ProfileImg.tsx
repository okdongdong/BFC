import { dividerClasses, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import { AccountReducer, ProfileReducer } from "../../../redux/rootReducer";
import { connect } from "react-redux";
import { setProfileImg } from "../../../redux/account/actions";
import { customAxios } from "../../../lib/customAxios";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) => ({
  myImg: {
    borderRadius: theme.spacing(100),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

function ProfileImg({
  profileImg,
  isLogin,
  currentUserId,
  setProfileImg,
  userId,
  myProfileImg,
}: Props) {
  console.log(profileImg);
  const classes = useStyles();
  const imgRef = useRef(
    document.getElementById("inputFile") as HTMLInputElement
  );
  const onChangeImage = () => {
    let reader = new FileReader();
    const formData = new FormData();
    const file = imgRef.current.files;
    if (file !== null) {
      reader.readAsDataURL(file[0]);
      formData.append("file", file[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (typeof reader.result == "string") {
            //null값 제외 시키기 위해서 필요
            setProfileImg(reader.result);
          }

          // console.log("이미지주소", reader.result);
          // console.log(file[0]);
          console.log("여기보세요", formData);
        }
        const token = localStorage.getItem("accessToken") || "";

        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/${userId}/profile`,
          data: formData,
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
          // customAxios({
          //   method: "post",
          //   url: `/users/${userId}/profile`,
          //   data: formData,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            console.log(token);
          });
      };
    }
  };
  const onClickFileBtn = () => {
    imgRef.current.click();
  };

  return (
    <div>
      {profileImg ? (
        <div>
          {currentUserId === userId ? (
            <img src={myProfileImg} className={classes.myImg}></img>
          ) : (
            <img src={profileImg} className={classes.myImg}></img>
          )}
        </div>
      ) : (
        <img
          src="https://cdn.newspenguin.com/news/photo/202002/1208_2870_473.jpg"
          className={classes.myImg}
        ></img>
      )}

      <div>
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          name="profileImg"
          ref={imgRef}
          onChange={onChangeImage}
          id="inputFile"
        />
        {currentUserId === userId ? (
          <button
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClickFileBtn();
            }}
          >
            프사수정
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = ({ account, profile }: any) => {
  return {
    isLogin: account.isLogin,
    profileImg: profile.profileImg,
    currentUserId: account.userId,
    userId: profile.userId,
    myProfileImg: account.profileImg,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setProfileImg: (profileImg: string) => dispatch(setProfileImg(profileImg)),
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileImg);
