import { connect } from 'react-redux';

import MonsterDetail from '../../components/MonsterDetail';

import { deleteMonster } from '../../actions/monster';

const mapStateToProps= (state) => ({
  isLoading: state.other.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  deleteMonster: (id, closeFunction, context) => {
    dispatch(deleteMonster(id, closeFunction, context));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonsterDetail);
