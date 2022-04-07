import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PreSurveyContainer from "../../components/FullCourse/PreSurvey/PreSurveyContainer";
import PreSurveyModal from "../../components/FullCourse/PreSurvey/PreSurveyModal";
import FixedMainBackground from "../../components/Main/FixedMainBackground";

function PreSurvey({ fullCourseId }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (fullCourseId) {
      setOpenModal(true);
    }
  }, [fullCourseId]);
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

const mapStateToProps = ({ createFullCourse }: any) => {
  return {
    fullCourseId: createFullCourse.fullCourseId,
  };
};

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PreSurvey);
