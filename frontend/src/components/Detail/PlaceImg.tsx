function PlaceImg() {
  const thumbnail: string =
    "https://media-cdn.tripadvisor.com/media/photo-s/1c/7a/0b/0d/caption.jpg";
  return (
    <img
      src={thumbnail}
      alt=""
      style={{ display: "flex", width: "200px", height: "200px" }}
    />
  );
}
export default PlaceImg;
