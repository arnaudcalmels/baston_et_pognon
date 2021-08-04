import React, { useState } from 'react';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import DeleteConfirm from '../../components/DeleteConfirm';
import EditProfile from '../../components/EditProfile';
import ChangePassword from '../../components/ChangePassword';

import PropTypes from 'prop-types';

import styles from './profile.module.scss';

const Profile = ({ username, email, avatar, id, editProfile, deleteProfile, logout, changePassword }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);  
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);  
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);  

  const handleDeleteProfile = (id) => {
    deleteProfile(id, logout);
  }

  return (
    <div className={styles['main']}>
      <img 
        className={styles['avatar']}
        src={avatar.base64} 
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
          children='Changer le mot de passe' 
          onClick={() => {
            setOpenChangePasswordModal(true);
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
        closeModal={() => {
          console.log('clic');
          setOpenDeleteModal(false);
        }}
        title='Supprimer le compte ?' 
        children={
          <DeleteConfirm 
            cancelAction={() => setOpenDeleteModal(false)} 
            confirmAction={() => {
              handleDeleteProfile(id)
              setOpenDeleteModal(false);
            }}
            context='profile'
          />}
      />

      <Modal 
        isOpen={openEditProfileModal}
        closeModal={() => setOpenEditProfileModal(false)}
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

      <Modal 
        isOpen={openChangePasswordModal}
        closeModal={() => setOpenChangePasswordModal(false)}
        title='Modifier le mot de passe'
        children={
          <ChangePassword 
            cancelAction={() => setOpenChangePasswordModal(false)} 
            changePassword={changePassword}
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
  changePassword: PropTypes.func,
};

export default Profile;