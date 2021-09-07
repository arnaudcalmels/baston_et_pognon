import { connect } from 'react-redux';

import MonsterGroup from '../../components/MonsterGroup';

import { getMonster } from '../../actions/monster';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  getMonster: (id, context) => {
    dispatch(getMonster(id, context));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MonsterGroup);
