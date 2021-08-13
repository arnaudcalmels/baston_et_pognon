import { connect } from 'react-redux';

import EditPlace from '../../components/EditPlace';

import { getCategories, getPlace, editPlace, deletePlace } from '../../actions/place';

const mapStateToProps= (state) => ({
  categories: state.place.categories,
  place: state.place.currentPlace,
  isLoading: state.other.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => {
    dispatch(getCategories());
  },
  getPlace: (id) => {
    dispatch(getPlace(id));
  },
  editPlace: (id, values, closeFunction) => {
    dispatch(editPlace(id, values, closeFunction));
  },
  deletePlace: (id, closeFunction) => {
    dispatch(deletePlace(id, closeFunction));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlace);
