import { connect } from 'react-redux';

import AddMonster from '../../components/AddMonster';

import { newMonster } from '../../actions/monster';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  newMonster: (slug, values) => {
    dispatch(newMonster(slug, values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMonster);
