import { connect } from 'react-redux';

import Profile from '../../pages/Profile';

import { editProfile, deleteProfile } from '../../actions/user';
import { logout } from '../../actions/auth';


const mapStateToProps= (state) => ({
  username: state.user.pseudo,
  email: state.user.email,
  avatar: state.user.avatar,
  id: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  // editProfile: () => {
  //   dispatch(editProfile());
  // },
  deleteProfile: (id) => {
    dispatch(deleteProfile(id));
  },
  logout: () => {
    dispatch(logout());
  },

});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);