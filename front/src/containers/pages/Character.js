import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Character from '../../pages/Character';

import { editCharacter, deleteCharacter } from '../../actions/character';

import getItem from '../../utils/getItem';

const mapStateToProps= (state, ownProps) => ({
  characters: state.character.characters,
  character: getItem(ownProps.match.params.id, 'characters'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editCharacter: (id, values) => {
    dispatch(editCharacter(id, values));
    ownProps.history.push(`/personnage/${id}`);
  },
  deleteCharacter: (id) => {
    dispatch(deleteCharacter(id));
    ownProps.history.push('/personnage');
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Character));