import { connect } from 'react-redux';

import EditMonster from "../../components/EditMonster";

import { editMonster } from '../../actions/monster';

const mapStateToProps = (state) => ({
  isLoading: state.other.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  editMonster: (id, values, closeFunction, context) => {
    dispatch(editMonster(id, values, closeFunction, context));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMonster);
