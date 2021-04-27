import { connect } from 'react-redux';

import Character from '../../pages/Character';

import { editCharacter, deleteCharacter } from '../../actions/character';


const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  editCharacter: (id, values) => {
    dispatch(editCharacter(id, values));
  },
  deleteCharacter: (id) => {
    dispatch(deleteCharacter(id));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Character);