import MainBackground from "../../components/Main/MainBackground";
import PlaceContainer from "../../components/Main/PlaceContainer";

function Main() {
  return (
    <div>
      <MainBackground></MainBackground>
      <PlaceContainer
        placeId={123}
        name="asdfasdf"
        thumbnail="https://t1.daumcdn.net/cfile/tistory/99504C385EF819AA07"
        address="asdfasdf"
        averageScore={3.2}
        category={0}
        keywords={["asdfasdf", "bbbbbb"]}
      ></PlaceContainer>
    </div>
  );
}
export default Main;
