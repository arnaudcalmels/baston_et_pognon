import { connect } from 'react-redux';

import Register from '../components/Register';

import { closeModal, signUp } from '../actions/auth';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeModal());
  },
  registerSubmit: (values) => {
    dispatch(signUp(values));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);