import { connect } from 'react-redux';

import Profile from '../../pages/Profile';

import { editProfile, deleteProfile, changePassword } from '../../actions/user';
import { logout } from '../../actions/auth';


const mapStateToProps= (state) => ({
  username: state.user.pseudo,
  email: state.user.email,
  avatar: state.user.avatar?.base64,
  id: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  editProfile: (id, values, closeFunction) => {
    dispatch(editProfile(id, values, closeFunction));
  },
  deleteProfile: (id) => {
    dispatch(deleteProfile(id));
  },
  logout: () => {
    dispatch(logout());
  },
  changePassword: (values) => {
    dispatch(changePassword(values));
  }

});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);