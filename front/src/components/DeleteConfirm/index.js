import React from 'react';

import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './deleteConfirm.module.scss';

const DeleteConfirm = ({ cancelAction, confirmAction }) => {
  return (
      <div className={styles['content']}>
        <p>
          Attention : toute suppression est définitive. Etes-vous sûr(e) ?
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
};

export default DeleteConfirm;

