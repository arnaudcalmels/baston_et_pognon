import { connect } from 'react-redux';

import MonsterDetail from '../../components/MonsterDetail';

import { deleteMonster } from '../../actions/monster';

const mapStateToProps= (state) => ({
  isLoading: state.other.isLoading.monster
});

const mapDispatchToProps = (dispatch) => ({
  deleteMonster: (id, closeFunction, context, placeId) => {
    dispatch(deleteMonster(id, closeFunction, context, placeId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonsterDetail);
