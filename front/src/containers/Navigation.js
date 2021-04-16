import { connect } from 'react-redux';

import Navigation from '../components/Navigation';

import { isRegisterModalOpen, isLoginModalOpen } from '../actions/auth';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  isRegisterModalOpen: () => {
    dispatch(isRegisterModalOpen());
  },
  isLoginModalOpen: () => {
    dispatch(isLoginModalOpen());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
