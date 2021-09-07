import { connect } from 'react-redux';

import EditPlace from '../../components/EditPlace';

import { getCategories, editPlace } from '../../actions/place';

const mapStateToProps= (state) => ({
  categories: state.place.categories,
  place: state.place.currentPlace,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => {
    dispatch(getCategories());
  },
  editPlace: (id, values, closeFunction) => {
    dispatch(editPlace(id, values, closeFunction));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlace);
