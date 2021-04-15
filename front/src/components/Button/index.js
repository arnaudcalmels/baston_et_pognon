import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ color, children, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            style={{
                backgroundColor: color,
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                // eslint-disable-next-line
                padding: '0.5rem 1rem',
                margin: '0.5rem 1rem',
                cursor: 'pointer'
                }}>
            {children}
        </button>
    );
};

Button.propTypes = {
    color: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;
