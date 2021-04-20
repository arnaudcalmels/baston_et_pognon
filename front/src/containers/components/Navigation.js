import { connect } from 'react-redux';

import Navigation from '../../components/Navigation';

import { isRegisterModalOpen, isLoginModalOpen, logout } from '../../actions/auth';

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.token,
  username: state.user.pseudo,
  avatar: state.user.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  isRegisterModalOpen: () => {
    dispatch(isRegisterModalOpen());
  },
  isLoginModalOpen: () => {
    dispatch(isLoginModalOpen());
  },
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
