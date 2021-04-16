import { connect } from 'react-redux';

import Register from '../components/Register';

import { closeModal } from '../actions/auth';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeModal());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);