import { connect } from 'react-redux';

import EditPlace from '../../components/EditPlace';

import { getCategories, getPlace } from '../../actions/place';

const mapStateToProps= (state) => ({
  categories: state.place.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => {
    dispatch(getCategories());
  },
  getPlace: (id) => {
    dispatch(getPlace(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlace);