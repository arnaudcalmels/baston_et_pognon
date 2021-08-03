import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Profile from '../../pages/Profile';

import { editProfile, deleteProfile, changePassword } from '../../actions/user';
import { logout } from '../../actions/auth';


const mapStateToProps= (state) => ({
  username: state.user.pseudo,
  email: state.user.email,
  avatar: state.user.avatar?.base64,
  id: state.user.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editProfile: (id, values, closeFunction) => {
    dispatch(editProfile(id, values, closeFunction));
  },
  deleteProfile: (id, logout) => {
    dispatch(deleteProfile(id, logout, ownProps.history.push));
  },
  logout: () => {
    dispatch(logout());
  },
  changePassword: (values, closeFunction) => {
    dispatch(changePassword(values, closeFunction));
  }

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));