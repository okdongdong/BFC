import KakaoMap from "../CreateFullCourse/KakaoMap";

export default function FullCourseMap() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "1300px",
          height: "500px",
        }}
      >
        <KakaoMap></KakaoMap>
      </div>
    </div>
  );
}
