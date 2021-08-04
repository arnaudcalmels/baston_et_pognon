import { connect } from 'react-redux';

import EditMonster from "../../components/EditMonster";

import { getMonster, editMonster, deleteMonster } from '../../actions/monster';

const mapStateToProps = (state) => ({
  currentMonster: state.monster.currentMonster,
  isLoading: state.other.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  getMonster: (id) => {
    dispatch(getMonster(id));
  },
  editMonster: (id, values, closeFunction) => {
    dispatch(editMonster(id, values, closeFunction));
  },
  deleteMonster: (id, closeFunction) => {
    dispatch(deleteMonster(id, closeFunction));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMonster);
