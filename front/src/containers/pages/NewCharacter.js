import { connect } from 'react-redux';

import NewCharacter from '../../pages/NewCharacter';

import { newCharacter } from '../../actions/character';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  newCharacter: (values) => {
    dispatch(newCharacter(values));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);