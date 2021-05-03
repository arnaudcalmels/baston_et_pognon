import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NewScenario from '../../pages/NewScenario';

import { newScenario } from '../../actions/scenario';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  newScenario: (values) => {
    dispatch(newScenario(values, ownProps.history.push));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewScenario));