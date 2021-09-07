import { connect } from 'react-redux';

import PlaceDetail from '../../components/PlaceDetail';

import { deletePlace } from '../../actions/place';

const mapStateToProps= (state) => ({
  isLoading: state.other.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  deletePlace: (id, closeFunction) => {
    dispatch(deletePlace(id, closeFunction));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);
