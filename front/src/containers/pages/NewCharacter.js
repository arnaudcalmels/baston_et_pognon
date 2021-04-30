import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NewCharacter from '../../pages/NewCharacter';

import { newCharacter } from '../../actions/character';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  newCharacter: (values) => {
    dispatch(newCharacter(values, ownProps.history.push));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCharacter));
