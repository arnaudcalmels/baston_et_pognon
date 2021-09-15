import { connect } from 'react-redux';

import Characters from '../../pages/Characters';

import { getCharacters } from '../../actions/character';


const mapStateToProps= (state) => ({
  isLoggedIn: !!state.auth.token,
  characters: state.character.characters,
  isLoading: state.other.isLoading.character
});

const mapDispatchToProps = (dispatch) => ({
  getCharacters: () => {
    dispatch(getCharacters());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Characters);