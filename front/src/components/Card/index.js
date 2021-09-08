import React from 'react';

import PropTypes from 'prop-types';

import styles from './card.module.scss';

const Card = ({ image, name, subtitle, level, onClick, alt }) => {
  return (
    <article className={styles['card']} onClick={onClick}
    >
      <div className={styles['image_container']}>
        <img 
          id={styles['image']}
          src={image} 
          alt={alt}
        />
      </div>
      <h3 className={styles['name']}>{name}</h3>
      <h4 className={styles['subtitle']}>{subtitle}</h4>
      <span className={styles['level']}>{level}</span>
    </article>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  level: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onClick: PropTypes.func,
  alt: PropTypes.string,
};

export default Card;