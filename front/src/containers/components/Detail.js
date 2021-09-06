import { connect } from 'react-redux';

import Detail from '../../components/Detail';

import { deleteMonster } from '../../actions/monster';

const mapStateToProps= (state) => ({
  item: state.scenario.currentItem,
  type: state.scenario.itemType,
});

const mapDispatchToProps = (dispatch) => ({
  deleteMonster: (id, closeFunction) => {
    dispatch(deleteMonster(id, closeFunction));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
