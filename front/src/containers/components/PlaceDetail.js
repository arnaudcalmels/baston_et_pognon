import { connect } from 'react-redux';

import PlaceDetail from '../../components/PlaceDetail';

import { deletePlace } from '../../actions/place';
import { getMonster } from '../../actions/monster';

const mapStateToProps= (state) => ({
  isLoading: state.other.isLoading.place
});

const mapDispatchToProps = (dispatch) => ({
  deletePlace: (id, closeFunction) => {
    dispatch(deletePlace(id, closeFunction));
  },
  getMonster: (id, context) => {
    dispatch(getMonster(id, context));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);
