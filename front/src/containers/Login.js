import { connect } from 'react-redux';

import Login from '../components/Login';

import { closeModal, login } from '../actions/auth';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeModal());
  },
  loginSubmit: (values) => {
    dispatch(login(values));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);