import { connect } from 'react-redux';

import Scenarios from '../../pages/Scenarios';

import { getScenarios } from '../../actions/scenario';

const mapStateToProps= (state) => ({
  isLoggedIn: !!state.auth.token,
  scenarios: state.scenario.scenarios,
});

const mapDispatchToProps = (dispatch) => ({
  getScenarios: () => {
    dispatch(getScenarios());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Scenarios);