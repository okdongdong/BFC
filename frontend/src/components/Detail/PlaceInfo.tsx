import PlaceShedule from "./PlaceSchedule";
function PlaceInfo() {
  const placeInfo: string =
    "최고급 육질의 미박삼겹살, 특목살,갈비본살을 친절한 직원들이 처음부터 끝까지 맛있게 다 구워드립니다.";
  const placeAddress: string = "부산 사상구 사상로 233번길 29 1층";
  const traffic: string =
    "사상 터미널 뒷 편, 네비게이션에 '사상 목구멍' 검색하면 찾아보실 수 있습니다(주차장은 따로 없습니다)";
  return (
    <div style={{ width: "500px", textAlign: "left" }}>
      <p style={{ marginTop: "8px", marginBottom: "8PX", fontWeight: "bold" }}>
        {placeInfo}
      </p>
      <p style={{ marginTop: "8px", marginBottom: "8PX" }}>주소</p>
      <p style={{ marginTop: "8px", marginBottom: "8PX", fontWeight: "bold" }}>
        {placeAddress}
      </p>
      <p style={{ marginTop: "8px", marginBottom: "8PX" }}>교통</p>
      <p style={{ marginTop: "8px", marginBottom: "8PX", fontWeight: "bold" }}>
        {traffic}
      </p>
      <PlaceShedule></PlaceShedule>
    </div>
  );
}
export default PlaceInfo;
