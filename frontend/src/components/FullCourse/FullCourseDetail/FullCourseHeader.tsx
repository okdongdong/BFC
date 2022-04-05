import FullCourseInfo from "./FullCourseInfo";
import FullCourseLike from "./FullCourseLike";
import FullCourseUser from "./FullCourseUser";

export default function FullCourseHeader() {
  return (
    <div>
      <FullCourseInfo></FullCourseInfo>
      <FullCourseUser></FullCourseUser>
      <hr style={{ width: "60%" }}></hr>
      <div style={{ marginLeft: "90rem" }}>
        <FullCourseLike></FullCourseLike>
      </div>
    </div>
  );
}
