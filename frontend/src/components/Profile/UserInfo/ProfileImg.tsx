import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useRef } from "react";
import defaultImg from "../../../assets/img/defaultImg.png";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) => ({
  myImg: {
    borderRadius: theme.spacing(100),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

function ProfileImg() {
  const user_id = 1; //데이터 받아옴
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(defaultImg);
  const imgRef = useRef(
    document.getElementById("inputFile") as HTMLInputElement
  );
  const onChangeImage = () => {
    let reader = new FileReader();
    const file = imgRef.current.files;
    if (file !== null) {
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (typeof reader.result == "string") {
            //null값 제외 시키기 위해서 필요
            setImageUrl(reader.result);
          }
          console.log("이미지주소", reader.result);
        }
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/${user_id}/profile`,
          data: file,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }
  };
  const onClickFileBtn = () => {
    imgRef.current.click();
  };
  return (
    <div>
      <img src={imageUrl} className={classes.myImg}></img>
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
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            onClickFileBtn();
          }}
        >
          프사수정
        </button>
      </div>
    </div>
  );
}
export default ProfileImg;
