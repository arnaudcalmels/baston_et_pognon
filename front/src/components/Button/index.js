import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ color, children, onClick, type, id, shadow }) => {
	return (
    <button 
      type={type}
      id={id}
      onClick={onClick} 
      style={{
        backgroundColor: color,
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '25px',
        // eslint-disable-next-line
        padding: '0.5rem 1rem',
        margin: '0.5rem 1rem',
        cursor: 'pointer',
        boxShadow: shadow,
        }}>
      {children}
    </button>
	);
};

Button.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
  shadow: PropTypes.string,
};

export default Button;
