import { connect } from 'react-redux';

import AddMonster from '../../components/AddMonster';

import { newMonster } from '../../actions/monster';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  newMonster: (slug, values, closeFunction) => {
    dispatch(newMonster(slug, values, closeFunction));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMonster);
