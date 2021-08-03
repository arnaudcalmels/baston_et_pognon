import { connect } from 'react-redux';

import AddPlace from '../../components/AddPlace';

import { getCategories, newPlace } from '../../actions/place';

const mapStateToProps= (state) => ({
  categories: state.place.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => {
    dispatch(getCategories());
  },
  newPlace: (data, closeFunction) => {
    dispatch(newPlace(data, closeFunction));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace);