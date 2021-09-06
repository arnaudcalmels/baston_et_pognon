import { connect } from 'react-redux';

import AddMonster from '../../components/AddMonster';

import { newMonster } from '../../actions/monster';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  newMonster: (slug, values, closeFunction, context) => {
    dispatch(newMonster(slug, values, closeFunction, context));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMonster);
