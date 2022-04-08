import ProfileHeader from "../../components/Profile/UserInfo/ProfileHeader";
import ProfileMain from "../../components/Profile/UserContents/ProfileMain";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setProfileData } from "../../redux/profile/actions";
import { SetProfileData } from "../../types/profile";
import { Backdrop, CircularProgress } from "@mui/material";
import { customAxios } from "../../lib/customAxios";
function Profile({ setProfileData, profile }: Props) {
  const params = useParams();
  const nickname = params["nickname"];
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    const result = await customAxios({
      method: "get",
      url: `/users/${nickname}/profile`,
    });
    setProfileData(result.data);
    setIsLoading(true);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isLoading ? (
        <div>
          <ProfileHeader></ProfileHeader>
          <ProfileMain></ProfileMain>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
const mapStateToProps = ({ profile }: any) => {
  return { profile: profile };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setProfileData: (profileData: SetProfileData) =>
      dispatch(setProfileData(profileData)),
  };
};
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
