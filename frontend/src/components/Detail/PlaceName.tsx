import { connect } from "react-redux";

function PlaceName({ name }: Props) {
  return <p>{name}</p>;
}
const mapStateToProps = ({ place }: any) => {
  return {
    name: place.name,
  };
};
type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PlaceName);
