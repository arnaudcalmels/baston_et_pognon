import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Scenario from '../../pages/Scenario';

import { editScenario, deleteScenario, getScenarios } from '../../actions/scenario';
import { getPlace } from '../../actions/place';
import { getMonsterSuccess } from '../../actions/monster';
import getItem from '../../utils/getItem';

const mapStateToProps= (state, ownProps) => ({
  scenarios: state.scenario.scenarios,
  scenario: getItem(ownProps.match.params.id, 'scenarios'),
  currentWanderingMonster: state.monster.currentWanderingMonster,
  currentPlace: state.place.currentPlace,
  currentMonsterInPlace: state.monster.currentMonsterInPlace,
  isLoggedIn: !!state.auth.token,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editScenario: (id, values, closeFunction) => {
    dispatch(editScenario(id, values, closeFunction, ownProps.history.push));
  },
  deleteScenario: (id) => {
    dispatch(deleteScenario(id, ownProps.history.push));
  },
  getPlace: (id) => {
    dispatch(getPlace(id));
  },
  getMonsterSuccess: (data, context) => {
    dispatch(getMonsterSuccess(data, context));
  },
  getScenarios: () => {
    dispatch(getScenarios());
  },

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Scenario));
