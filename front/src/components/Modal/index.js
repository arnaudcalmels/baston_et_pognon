import React, { useState } from 'react';
import ReactModal from 'react-modal';

// import PropTypes from 'prop-types';

const Modal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
      
    ReactModal.setAppElement('#root');
      
    return (
        <ReactModal             
            isOpen={isOpen}
      />
    );
};

// Modal.propTypes = {
    
// };

export default Modal;