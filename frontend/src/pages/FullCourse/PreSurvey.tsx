import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import PreSurveyContainer from "../../components/FullCourse/PreSurvey/PreSurveyContainer";
import PreSurveyModal from "../../components/FullCourse/PreSurvey/PreSurveyModal";
import FixedMainBackground from "../../components/Main/FixedMainBackground";

function PreSurvey({ fullCourseId, isLogin }: Props) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (fullCourseId) {
      setOpenModal(true);
    }
  }, [fullCourseId]);

  useEffect(() => {
    if (!isLogin) {
      navigate(-1);
    }
  }, [isLogin]);

  return (
    <div>
      <FixedMainBackground></FixedMainBackground>
      <PreSurveyModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      ></PreSurveyModal>
      <PreSurveyContainer></PreSurveyContainer>
    </div>
  );
}

const mapStateToProps = ({ createFullCourse, account }: any) => {
  return {
    fullCourseId: createFullCourse.fullCourseId,
    isLogin: account.isLogin,
  };
};

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PreSurvey);
