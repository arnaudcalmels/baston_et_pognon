import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NewCharacter from '../../pages/NewCharacter';

import { newCharacter, getProfessions, getRaces } from '../../actions/character';

const mapStateToProps= (state) => ({
  professions: state.character.professions,
  races: state.character.races,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  newCharacter: (values) => {
    dispatch(newCharacter(values, ownProps.history.push));
  },
  getProfessions: () => {
    dispatch(getProfessions());
  },
  getRaces: () => {
    dispatch(getRaces());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCharacter));
