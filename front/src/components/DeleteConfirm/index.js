import React from 'react';

import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './deleteConfirm.module.scss';

const DeleteConfirm = ({ cancelAction, confirmAction, context }) => {
  let message;
  switch (context) {
    case 'place':
      message = `Attention : la suppression d'un lieu entraîne la suppression des monstres qui y sont rattachés. Etes-vous sûr(e) ?`;
      break;

    case 'scenario':
      message = `Attention : la suppression d'un scenario entraîne la suppression des lieux et monstres qui y sont rattachés. Etes-vous sûr(e) ?`;
      break;
  
    case 'profile':
      message = `Attention : la suppression d'un compte entraîne la suppression des scénarios qui y sont rattachés. Etes-vous sûr(e) ?`;
      break;
      
    default:
      message = 'Attention : toute suppression est définitive. Etes-vous sûr(e) ?';
      break;

  }

  return (
      <div className={styles['content']}>
        <p>
          {message}
        </p>
        <Button 
          color='#eee' 
          children='Annuler' 
          onClick={cancelAction}
        />
        <Button 
          color='#eee' 
          children='Supprimer' 
          onClick={confirmAction} 
        />
      </div>
  );
};

DeleteConfirm.propTypes = {
  cancelAction: PropTypes.func,
  confirmAction: PropTypes.func,
  context: PropTypes.string,
};

export default DeleteConfirm;

