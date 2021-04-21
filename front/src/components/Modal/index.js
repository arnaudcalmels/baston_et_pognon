import React from 'react';
import ReactModal from 'react-modal';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './modal.module.scss';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, closeModal, title, children }) => {
            
  return (
    <ReactModal             
      isOpen={isOpen}
      onRequestClose={() => closeModal()}
      className={styles['content']}
      overlayClassName={styles['overlay']}
    >
      <div className={styles['header']}>
        <span className={styles['title']}>{title}</span>
        <FontAwesomeIcon onClick={closeModal} icon={faTimes} size='2x' style={{cursor: 'pointer', position: 'absolute', right: '15px'}} pull='right' />
      </div>
      {children}
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  title: PropTypes.string,
};

export default Modal;