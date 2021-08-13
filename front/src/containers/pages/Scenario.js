import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Scenario from '../../pages/Scenario';

import { editScenario, deleteScenario } from '../../actions/scenario';

import getItem from '../../utils/getItem';

const mapStateToProps= (state, ownProps) => ({
  scenarios: state.scenario.scenarios,
  scenario: getItem(ownProps.match.params.id, 'scenarios'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editScenario: (id, values, closeFunction) => {
    dispatch(editScenario(id, values, closeFunction, ownProps.history.push));
  },
  deleteScenario: (id) => {
    dispatch(deleteScenario(id, ownProps.history.push));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Scenario));
