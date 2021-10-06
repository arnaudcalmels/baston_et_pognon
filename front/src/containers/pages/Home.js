import { connect } from 'react-redux';

import Home from '../../pages/Home';

import { isRegisterModalOpen, isLoginModalOpen } from '../../actions/auth';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  isRegisterModalOpen: () => {
    dispatch(isRegisterModalOpen());
  },
  isLoginModalOpen: () => {
    dispatch(isLoginModalOpen());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
