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
      <div className={styles['image_container']}>
        <img
          className={styles['avatar']}
          src={avatar.base64}
          alt='photo_avatar'/>
      </div>
      <h2 className={styles['name']}>{username}</h2>
      <p className={styles['email']}>Email : {email}</p>

      <div className={styles['buttons']}>
        <Button 
          color='#eee' 
          children='Editer le profil' 
          onClick={() => {
            setOpenEditProfileModal(true);
          }} 
          shadow='#333 2px 2px 6px'
        />

        <Button 
          color='#eee' 
          children='Changer le mot de passe' 
          onClick={() => {
            setOpenChangePasswordModal(true);
          }} 
          shadow='#333 2px 2px 6px'
        />

        <Button 
          color='#eee' 
          children='Supprimer le compte' 
          onClick={() => {
            setOpenDeleteModal(true);
          }} 
          shadow='#333 2px 2px 6px'
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