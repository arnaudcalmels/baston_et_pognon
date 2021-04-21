import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Modal from '../../containers/components/Modal';
import DeleteConfirm from '../../components/DeleteConfirm';
import EditProfile from '../../components/EditProfile';

import PropTypes from 'prop-types';

import styles from './profile.module.css';

const Profile = ({ username, email, avatar, id, editProfile, deleteProfile, logout }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);  
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);  

  let history = useHistory(); 
  const handleDeleteProfile = (id) => {
    deleteProfile(id);
    logout();
    history.push('/');
  }


  return (
    <div className={styles['main']}>
      <img 
        className={styles['avatar']}
        src={avatar} 
        alt='photo_avatar'/>
      <h2 className={styles['name']}>{username}</h2>
      <p className={styles['email']}>Email : {email}</p>

      <div className={styles['buttons']}>
        <Button 
          color='#eee' 
          children='Editer le profil' 
          onClick={() => {
            setOpenEditProfileModal(true);
          }} 
        />
        <Button 
          color='#eee' 
          children='Supprimer le compte' 
          onClick={() => {
            setOpenDeleteModal(true);
          }} 
        />
      </div>

      <Modal 
        isOpen={openDeleteModal} 
        title='Supprimer le compte ?' 
        children={
          <DeleteConfirm 
            cancelAction={() => setOpenDeleteModal(false)} 
            confirmAction={() => {
              handleDeleteProfile(id)
              setOpenDeleteModal(false);
            }}
          />}
      />

      <Modal 
        isOpen={openEditProfileModal}
        title='Modifier le profil'
        children={
          <EditProfile 
            pseudo={username}
            email={email}
            id={id}
            avatar={avatar}
            cancelAction={() => setOpenEditProfileModal(false)} 
            editProfile={editProfile}
          />
        }
      />
    </div>

  );
};

Profile.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
  id: PropTypes.number,
  editProfile: PropTypes.func,
  deleteProfile: PropTypes.func,
  logout: PropTypes.func,

};

export default Profile;