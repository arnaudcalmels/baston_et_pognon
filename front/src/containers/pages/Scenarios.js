import { connect } from 'react-redux';

import Scenarios from '../../pages/Scenarios';

import { getScenarios } from '../../actions/scenario';
import { getPlaceSuccess } from '../../actions/place';
import { getMonsterSuccess } from '../../actions/monster';

const mapStateToProps= (state) => ({
  isLoggedIn: !!state.auth.token,
  scenarios: state.scenario.scenarios,
});

const mapDispatchToProps = (dispatch) => ({
  getScenarios: () => {
    dispatch(getScenarios());
  },
  getPlaceSuccess: (data) => {
    dispatch(getPlaceSuccess(data));
  },
  getMonsterSuccess: (data, context) => {
    dispatch(getMonsterSuccess(data, context));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Scenarios);