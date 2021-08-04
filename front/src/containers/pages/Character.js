import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Character from '../../pages/Character';

import { editCharacter, deleteCharacter, getProfessions, getRaces } from '../../actions/character';

import getItem from '../../utils/getItem';

const mapStateToProps= (state, ownProps) => ({
  characters: state.character.characters,
  character: getItem(ownProps.match.params.id, 'characters'),
  professions: state.character.professions,
  races: state.character.races,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editCharacter: (id, values, closeFunction) => {
    dispatch(editCharacter(id, values, closeFunction, ownProps.history.push));
  },
  deleteCharacter: (id) => {
    dispatch(deleteCharacter(id, ownProps.history.push));
  },
  getProfessions: () => {
    dispatch(getProfessions());
  },
  getRaces: () => {
    dispatch(getRaces());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Character));