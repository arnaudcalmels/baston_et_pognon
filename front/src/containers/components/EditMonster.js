import { connect } from 'react-redux';

import EditMonster from "../../components/EditMonster";

import { getMonster, editMonster } from '../../actions/monster';

const mapStateToProps = (state) => ({
  currentMonster: state.monster.currentMonster,
  isLoading: state.other.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  getMonster: (id) => {
    dispatch(getMonster(id));
  },
  editMonster: (id, values) => {
    dispatch(editMonster(id, values));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMonster);
